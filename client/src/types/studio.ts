/**
 * 지도 좌표 (프론트엔드 전용)
 */
export interface StudioCoordinates {
  x: number; // 지도 상 위치 (%)
  y: number; // 지도 상 위치 (%)
}

/**
 * 스튜디오 정보 (서버 모델 기반)
 * server/features/studio/models.py 참고
 */
export interface Studio {
  studio_id: string; // 스튜디오 고유 식별자
  user_id?: string | null; // 유저 식별자 (nullable)
  name: string; // 스튜디오 이름
  instagram?: string | null; // 인스타그램
  location?: string | null; // 위치
  email?: string | null; // 이메일
  website?: string | null; // 웹사이트
  is_verified: boolean; // 인증 상태
  reservation_form?: string | null; // 예약 폼 URL
  default_duration?: string | null; // 기본 수업 시간 (HH:MM:SS)
  default_price?: number | null; // 기본 가격
  youtube?: string | null; // 유튜브 채널
  bio?: string | null; // 소개글

  // 프론트엔드 전용 필드
  coordinates?: StudioCoordinates; // 지도 표시용 좌표
  nearby_station?: string; // 근처역 (프론트엔드 전용)
}

/**
 * 뷰 모드
 */
export type ViewMode = "card" | "map";
