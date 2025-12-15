import asyncio
from collections import defaultdict
from sqlalchemy import select, func

# DB 연결 세션 가져오기
from server.database.connection import SESSION
# 모델 가져오기
from server.features.dance_class.models import Class

async def remove_duplicate_classes():
    print("\n🚀 스크립트 시작...")
    
    # 1. [팩트 체크] 삭제 전 전체 수업 개수 확인
    count_query = await SESSION.execute(select(func.count()).select_from(Class))
    before_count = count_query.scalar()
    print(f"📊 현재 DB에 저장된 총 수업 개수: {before_count}개")

    # 2. 모든 수업 조회
    print("...데이터 조회 중...")
    result = await SESSION.scalars(
        select(Class).execution_options(populate_existing=True)
    )
    all_classes = list(result.all())
    
    # 3. 중복 그룹핑 로직 (기존과 동일)
    duplicate_groups = defaultdict(list)
    
    for dance_class in all_classes:
        # 중복 판단 기준: 스튜디오ID + 시간 + 장르 + 레벨
        # (주의: 장르나 레벨이 Enum인 경우 값을 문자열로 변환해서 키로 사용)
        key = (
            dance_class.studio_id,
            dance_class.class_datetime,
            str(dance_class.genre),
            str(dance_class.level)
        )
        duplicate_groups[key].append(dance_class)

    # 4. 삭제 대상 선정 및 삭제
    total_deleted = 0
    
    for key, classes in duplicate_groups.items():
        if len(classes) > 1:
            # 생성일(class_id 등) 순으로 정렬해서 가장 먼저 생긴(혹은 나중) 하나만 남김
            # 여기서는 리스트의 첫 번째를 남기고 나머지 삭제
            keep_class = classes[0]
            to_delete = classes[1:]
            
            for class_obj in to_delete:
                print(f"  ❌ 삭제 대기: ID {class_obj.class_id} / {class_obj.class_datetime}")
                await SESSION.delete(class_obj)
                total_deleted += 1

    if total_deleted == 0:
        print("\n✨ 삭제할 중복 수업이 없습니다.")
        return

    print(f"\n총 {total_deleted}개의 중복 수업을 삭제 목록에 올렸습니다.")

    # 5. [핵심] 강제 커밋 (이게 없어서 아까 실패한 것임)
    try:
        print("💾 DB 저장(Commit) 중... 잠시만 기다리세요...")
        await SESSION.commit()  # <--- 여기서 진짜로 지워집니다!
        print("✅ DB 저장 완료!")
    except Exception as e:
        print(f"💥 저장 중 에러 발생: {e}")
        await SESSION.rollback()
        return

    # 6. 결과 확인
    count_query_after = await SESSION.execute(select(func.count()).select_from(Class))
    after_count = count_query_after.scalar()
    
    print("-" * 30)
    print(f"📊 삭제 전 개수: {before_count}")
    print(f"📉 삭제 후 개수: {after_count}")
    print("-" * 30)


async def main():
    try:
        await remove_duplicate_classes()
    except Exception as e:
        print(f"스크립트 에러: {e}")
        await SESSION.rollback()
    finally:
        # 세션 닫기
        await SESSION.close()
        print("스크립트 종료")

if __name__ == "__main__":
    asyncio.run(main())