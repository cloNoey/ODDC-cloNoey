from pydantic import BaseModel, Field, field_validator
from typing import Optional


class StudioCreateRequest(BaseModel):
    """스튜디오 생성 요청"""
    name: str = Field(
        description="스튜디오 이름",
        examples=["1MILLION Dance Studio", "Just Jerk Academy", "프리마 댄스 스튜디오"],
        min_length=1,
        max_length=50
    )
    instagram: Optional[str] = Field(
        default=None,
        description="스튜디오 인스타그램 아이디",
        examples=["1milliondance", "justjerkofficial", "primadancestudio"],
        max_length=50
    )
    location: Optional[str] = Field(
        default=None,
        description="스튜디오 위치/주소",
        examples=["서울시 강남구 논현로 716", "Seoul, Gangnam-gu"],
        max_length=255
    )
    lat: Optional[float] = Field(
        default=None,
        description="위도 (Latitude)",
        examples=[37.5172, 37.4979],
        ge=-90.0,
        le=90.0
    )
    lng: Optional[float] = Field(
        default=None,
        description="경도 (Longitude)",
        examples=[127.0473, 127.0276],
        ge=-180.0,
        le=180.0
    )
    station: Optional[str] = Field(
        default=None,
        description="가까운 역",
        examples=["강남역", "홍대입구역"],
        max_length=100
    )
    city: Optional[str] = Field(
        default=None,
        description="도시",
        examples=["서울", "부산"],
        max_length=100
    )
    district: Optional[str] = Field(
        default=None,
        description="구",
        examples=["강남구", "마포구"],
        max_length=100
    )
    email: Optional[str] = Field(
        default=None,
        description="스튜디오 이메일",
        examples=["contact@1milliondance.com", "info@justjerk.com"],
        max_length=100
    )
    website: Optional[str] = Field(
        default=None,
        description="스튜디오 웹사이트 URL",
        examples=["https://www.1milliondance.com", "https://justjerk.com"],
        max_length=255
    )
    reservation_form: Optional[str] = Field(
        default=None,
        description="예약 폼 URL",
        examples=["https://forms.gle/abc123", "https://naver.me/reservation"],
        max_length=255
    )
    default_duration: Optional[str] = Field(
        default=None,
        description="기본 클래스 시간 (HH:MM:SS 형식)",
        examples=["01:00:00", "01:30:00", "02:00:00"]
    )
    default_price: Optional[int] = Field(
        default=None,
        description="기본 수업료 (원 단위)",
        examples=[30000, 40000, 50000],
        ge=0
    )
    youtube: Optional[str] = Field(
        default=None,
        description="스튜디오 유튜브 채널",
        examples=["https://youtube.com/@1milliondance", "https://www.youtube.com/c/JUSTJERK"],
        max_length=255
    )
    bio: Optional[str] = Field(
        default=None,
        description="스튜디오 소개글",
        examples=["강남 최고의 댄스 스튜디오", "K-POP 안무 전문 스튜디오"],
        max_length=500
    )
    user_id: Optional[str] = Field(
        default=None,
        description="연결할 사용자 ID (선택사항)",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )

    @field_validator('default_duration')
    @classmethod
    def validate_time_format(cls, v: Optional[str]) -> Optional[str]:
        """시간 형식 검증 (HH:MM:SS)"""
        if v is None:
            return v
        try:
            # Parse to verify format
            parts = v.split(':')
            if len(parts) != 3:
                raise ValueError('Time must be in HH:MM:SS format')
            hours, minutes, seconds = map(int, parts)
            if not (0 <= hours <= 23 and 0 <= minutes <= 59 and 0 <= seconds <= 59):
                raise ValueError('Invalid time values')
            return v
        except Exception:
            raise ValueError('Invalid time format. Expected HH:MM:SS')


class StudioEditRequest(BaseModel):
    """스튜디오 정보 수정 요청"""
    studio_id: str = Field(
        description="스튜디오 고유 식별자",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )
    name: Optional[str] = Field(
        default=None,
        description="스튜디오 이름",
        examples=["1MILLION Dance Studio"],
        min_length=1,
        max_length=50
    )
    instagram: Optional[str] = Field(
        default=None,
        description="스튜디오 인스타그램 아이디",
        examples=["1milliondance"],
        max_length=50
    )
    location: Optional[str] = Field(
        default=None,
        description="스튜디오 위치/주소",
        examples=["서울시 강남구 논현로 716"],
        max_length=255
    )
    lat: Optional[float] = Field(
        default=None,
        description="위도 (Latitude)",
        examples=[37.5172],
        ge=-90.0,
        le=90.0
    )
    lng: Optional[float] = Field(
        default=None,
        description="경도 (Longitude)",
        examples=[127.0473],
        ge=-180.0,
        le=180.0
    )
    station: Optional[str] = Field(
        default=None,
        description="가까운 역",
        examples=["강남역"],
        max_length=100
    )
    city: Optional[str] = Field(
        default=None,
        description="도시",
        examples=["서울"],
        max_length=100
    )
    district: Optional[str] = Field(
        default=None,
        description="구",
        examples=["강남구"],
        max_length=100
    )
    email: Optional[str] = Field(
        default=None,
        description="스튜디오 이메일",
        examples=["contact@1milliondance.com"],
        max_length=100
    )
    website: Optional[str] = Field(
        default=None,
        description="스튜디오 웹사이트 URL",
        examples=["https://www.1milliondance.com"],
        max_length=255
    )
    reservation_form: Optional[str] = Field(
        default=None,
        description="예약 폼 URL",
        examples=["https://forms.gle/abc123"],
        max_length=255
    )
    default_duration: Optional[str] = Field(
        default=None,
        description="기본 클래스 시간 (HH:MM:SS 형식)",
        examples=["01:00:00", "01:30:00"]
    )
    default_price: Optional[int] = Field(
        default=None,
        description="기본 수업료 (원 단위)",
        examples=[30000, 40000],
        ge=0
    )
    youtube: Optional[str] = Field(
        default=None,
        description="스튜디오 유튜브 채널",
        examples=["https://youtube.com/@1milliondance"],
        max_length=255
    )
    bio: Optional[str] = Field(
        default=None,
        description="스튜디오 소개글",
        examples=["강남 최고의 댄스 스튜디오"],
        max_length=500
    )
    is_verified: Optional[bool] = Field(
        default=None,
        description="인증 상태"
    )

    @field_validator('default_duration')
    @classmethod
    def validate_time_format(cls, v: Optional[str]) -> Optional[str]:
        """시간 형식 검증 (HH:MM:SS)"""
        if v is None:
            return v
        try:
            parts = v.split(':')
            if len(parts) != 3:
                raise ValueError('Time must be in HH:MM:SS format')
            hours, minutes, seconds = map(int, parts)
            if not (0 <= hours <= 23 and 0 <= minutes <= 59 and 0 <= seconds <= 59):
                raise ValueError('Invalid time values')
            return v
        except Exception:
            raise ValueError('Invalid time format. Expected HH:MM:SS')


class StudioDeleteRequest(BaseModel):
    """스튜디오 삭제 요청"""
    studio_id: str = Field(
        description="삭제할 스튜디오의 고유 식별자",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )
