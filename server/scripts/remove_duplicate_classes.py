#!/usr/bin/env python3
"""
중복 수업 제거 스크립트

중복 기준: class_datetime + studio_id + dancers (댄서 ID 리스트)
각 중복 그룹에서 첫 번째 수업만 남기고 나머지 삭제
"""

import asyncio
from collections import defaultdict
from sqlalchemy import select

from server.database.connection import SESSION
from server.database.annotation import transactional
from server.features.dance_class.models import Class


@transactional
async def remove_duplicate_classes():
    """
    중복된 수업 제거

    중복 기준:
    - class_datetime (날짜 + 시간)
    - studio_id (스튜디오)
    - dancers (댄서 리스트, 순서 무관)
    """
    print("=== 모든 수업 조회 중 ===")

    # 1. 모든 수업 조회 (dancers 관계 포함)
    result = await SESSION.scalars(
        select(Class).execution_options(populate_existing=True)
    )
    all_classes = list(result.all())

    print(f"총 수업 수: {len(all_classes)}")

    # 2. 중복 그룹화
    # Key: (class_datetime, studio_id, sorted dancer_ids tuple)
    duplicates_map = defaultdict(list)

    for class_obj in all_classes:
        # 댄서 ID를 정렬해서 튜플로 만들기 (순서 무관하게)
        dancer_ids = tuple(sorted([d.dancer_id for d in class_obj.dancers]))
        key = (class_obj.class_datetime, class_obj.studio_id, dancer_ids)
        duplicates_map[key].append(class_obj)

    # 3. 중복 그룹만 필터링 (2개 이상인 그룹)
    duplicate_groups = {k: v for k, v in duplicates_map.items() if len(v) > 1}

    print(f"\n=== 중복 분석 결과 ===")
    print(f"중복 그룹 수: {len(duplicate_groups)}")

    if len(duplicate_groups) == 0:
        print("중복된 수업이 없습니다!")
        return

    # 4. 각 그룹에서 첫 번째만 남기고 나머지 삭제
    total_deleted = 0

    print(f"\n=== 중복 수업 삭제 시작 ===")
    for key, classes in duplicate_groups.items():
        datetime_str, studio_id, dancer_ids = key

        print(f"\n중복 그룹:")
        print(f"  - 날짜/시간: {datetime_str}")
        print(f"  - 스튜디오: {studio_id}")
        print(f"  - 댄서 수: {len(dancer_ids)}")
        print(f"  - 중복 수: {len(classes)}개")
        print(f"  - 삭제 예정: {len(classes) - 1}개")

        # 첫 번째는 유지, 나머지 삭제
        keep_class = classes[0]
        to_delete = classes[1:]

        print(f"  - 유지: {keep_class.class_id}")

        for class_obj in to_delete:
            print(f"  - 삭제: {class_obj.class_id}")
            SESSION.delete(class_obj)
            total_deleted += 1

    # 5. 변경사항 flush
    await SESSION.flush()

    print(f"\n=== 삭제 완료 ===")
    print(f"총 {total_deleted}개 수업 삭제")
    print(f"최종 수업 수: {len(all_classes)} → {len(all_classes) - total_deleted}")
    print("\n트랜잭션 커밋 대기 중...")


async def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("중복 수업 제거 스크립트")
    print("=" * 60)
    print()

    try:
        await remove_duplicate_classes()
        print()
        print("=" * 60)
        print("성공적으로 완료되었습니다!")
        print("=" * 60)
    except Exception as e:
        print()
        print("=" * 60)
        print("오류 발생!")
        print("=" * 60)
        print(f"오류 타입: {type(e).__name__}")
        print(f"오류 메시지: {str(e)}")
        import traceback
        traceback.print_exc()
        raise


if __name__ == "__main__":
    asyncio.run(main())
