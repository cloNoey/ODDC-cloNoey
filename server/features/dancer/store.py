from sqlalchemy.sql import select
from sqlalchemy import func
from typing import List, Dict, Tuple, Any

from server.database.connection import SESSION
from server.database.annotation import transactional
from server.features.dancer.models import Dancer, Genre
from server.features.dancer.errors import dancer_creation_error, dancer_edit_error, dancer_delete_error

class DancerStore:
    def __init__(self) -> None:
        self.session = SESSION

    async def get_dancer_by_id(self, dancer_id: str) -> Dancer | None:
        return await self.session.scalar(select(Dancer).where(Dancer.dancer_id == dancer_id))

    async def get_dancer_by_name(self, name: str) -> List[Dancer]:
        """특정 이름이 names 배열에 포함된 모든 댄서 조회"""
        result = await self.session.scalars(
            select(Dancer).where(
                func.json_search(
                    Dancer.names,
                    'one',
                    name
                ).isnot(None)
            )
        )
        return list(result.all())

    async def get_dancer_by_instagram(self, instagram: str) -> Dancer | None:
        return await self.session.scalar(select(Dancer).where(Dancer.instagram == instagram))

    @transactional
    async def create_dancer(
        self,
        name: str,
        instagram: str | None = None,
        genre: str | None = None,
        user_id: str | None = None
    ) -> Dancer:
        try:
            dancer = Dancer(
                main_name=name,
                names=[name],
                instagram=instagram,
                genre=Genre(genre) if genre else None,
                user_id=user_id if user_id else None
            )
            SESSION.add(dancer)
            return dancer
        except Exception as e:
            raise dancer_creation_error(e)
    
    @transactional
    async def add_dancer_name(
        self,
        dancer: Dancer,
        name: str
    ) -> Dancer:
        try:
            dancer_in_session = await SESSION.get(Dancer, dancer.dancer_id)
            if dancer_in_session is None:
                dancer = await SESSION.merge(dancer)
            else:
                dancer = dancer_in_session

            if name not in dancer.names:
                dancer.names = dancer.names + [name]
                # main_name은 names의 첫 번째 항목으로 유지
                dancer.main_name = dancer.names[0]
            return dancer
        except Exception as e:
            raise dancer_edit_error(e)

    @transactional
    async def edit_dancer(
        self,
        dancer: Dancer,
        names: List[str] | None = None,
        instagram: str | None = None,
        main_name: str | None = None,
        genre: str | None = None,
        is_verified: bool | None = None
    ) -> Dancer:
        try:
            dancer_in_session = await SESSION.get(Dancer, dancer.dancer_id)
            if dancer_in_session is None:
                dancer = await SESSION.merge(dancer)
            else:
                dancer = dancer_in_session

            if names is not None:
                dancer.names = names
                # names가 업데이트되면 main_name도 첫 번째 항목으로 업데이트
                if len(names) > 0:
                    dancer.main_name = names[0]
            if main_name is not None:
                dancer.main_name = main_name
            if instagram is not None:
                dancer.instagram = instagram
            if genre is not None:
                try:
                    dancer.genre = Genre(genre)
                except ValueError:
                    # 잘못된 genre 값인 경우 None으로 설정
                    dancer.genre = None
            if is_verified is not None:
                dancer.is_verified = is_verified

            return dancer
        except Exception as e:
            raise dancer_edit_error(e)

    @transactional
    async def delete_dancer(self, dancer: Dancer) -> None:
        try:
            dancer_in_session = await SESSION.get(Dancer, dancer.dancer_id)
            if dancer_in_session is None:
                dancer = await SESSION.merge(dancer)
            else:
                dancer = dancer_in_session

            SESSION.delete(dancer)
        except Exception as e:
            raise dancer_delete_error(e)

    @transactional
    async def create_or_update_dancers_bulk(
        self,
        dancers_data: List[Dict[str, Any]]
    ) -> Tuple[int, List[Dict[str, Any]]]:
        """
        여러 댄서를 일괄 저장 또는 업데이트 (Upsert)

        instagram 기반으로 처리:
        - DB에 이미 존재: 이름을 names 리스트에 추가 (중복 제외)
        - 한 파일 내에서 중복: 모두 같은 dancer에 이름 추가
        - 미등록: 새로운 댄서 생성

        Args:
            dancers_data: [{"name": "김민준", "instagram": "dancer_minjun"}, ...]

        Returns:
            (성공한 개수, 실패 정보 리스트)
        """
        success_count = 0
        errors = []
        processed_instagrams = {}  # 파일 내 처리한 instagram 추적

        for row_num, dancer_data in enumerate(dancers_data, start=1):
            try:
                name = dancer_data.get("name", "").strip()
                instagram = dancer_data.get("instagram", "").strip() if dancer_data.get("instagram") else None

                # 검증
                if not name:
                    errors.append({
                        "row": row_num,
                        "name": name,
                        "instagram": instagram,
                        "error": "Name is required and cannot be empty"
                    })
                    continue

                if len(name) > 20:
                    errors.append({
                        "row": row_num,
                        "name": name,
                        "instagram": instagram,
                        "error": "Name exceeds maximum length (20 characters)"
                    })
                    continue

                if instagram and len(instagram) > 50:
                    errors.append({
                        "row": row_num,
                        "name": name,
                        "instagram": instagram,
                        "error": "Instagram ID exceeds maximum length (50 characters)"
                    })
                    continue

                # 추가 필드 추출
                genre = dancer_data.get("genre", "").strip() if dancer_data.get("genre") else None

                # instagram 기반 처리
                if instagram:
                    # 파일 내에서 이미 처리한 instagram인지 확인
                    if instagram in processed_instagrams:
                        # 같은 dancer에 이름 추가
                        existing_dancer = processed_instagrams[instagram]
                        if name not in existing_dancer.names:
                            existing_dancer.names = existing_dancer.names + [name]
                    else:
                        # DB에서 instagram으로 조회
                        existing_dancer = await SESSION.scalar(
                            select(Dancer).where(Dancer.instagram == instagram)
                        )

                        # TEMPORARY: instagram으로 못 찾으면 이름으로도 검색
                        if not existing_dancer:
                            existing_dancer = await SESSION.scalar(
                                select(Dancer).where(Dancer.main_name == name)
                            )

                        if existing_dancer:
                            # 기존 댄서 업데이트: instagram 추가 및 이름 추가
                            if existing_dancer.instagram is None:
                                existing_dancer.instagram = instagram
                            if name not in existing_dancer.names:
                                existing_dancer.names = existing_dancer.names + [name]
                            processed_instagrams[instagram] = existing_dancer
                        else:
                            # 새 댄서 생성
                            new_dancer = Dancer(
                                main_name=name,
                                names=[name],
                                instagram=instagram,
                                genre=Genre(genre) if genre else None
                            )
                            SESSION.add(new_dancer)
                            processed_instagrams[instagram] = new_dancer
                else:
                    # instagram 없이 생성
                    new_dancer = Dancer(
                        main_name=name,
                        names=[name],
                        instagram=None,
                        genre=Genre(genre) if genre else None
                    )
                    SESSION.add(new_dancer)

                success_count += 1

            except Exception as e:
                errors.append({
                    "row": row_num,
                    "name": dancer_data.get("name", ""),
                    "instagram": dancer_data.get("instagram", ""),
                    "error": str(e)
                })

        return success_count, errors