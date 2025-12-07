from fastapi import HTTPException

def class_creation_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail={"message": f"수업 생성에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )

def class_edit_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail={"message": f"수업 정보 수정에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )

def class_delete_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail={"message": f"수업 삭제에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )
