import type { Studio, Dancer, ClassSchedule, ClassDancer } from '@/types';

/**
 * 백엔드 ClassDetailResponse → 프론트 ClassSchedule
 * 백엔드 class_datetime (ISO8601) → class_date + start_time으로 분리
 */
export function transformClassResponse(backendClass: any): ClassSchedule {
  const datetime = new Date(backendClass.class_datetime);

  return {
    class_id: backendClass.class_id,
    studio_id: backendClass.studio_id || backendClass.studio?.studio_id,
    class_date: datetime.toISOString().split('T')[0], // "2025-01-15"
    start_time: datetime.toTimeString().slice(0, 5), // "14:00"
    genre: backendClass.genre,
    level: backendClass.level,
    dancers: backendClass.dancers.map((d: any): ClassDancer => ({
      dancer_id: d.dancer_id,
      main_name: d.main_name,
      instagram: d.instagram,
    })),
  };
}

/**
 * 백엔드 StudioResponse → 프론트 Studio
 * 백엔드: lat, lng, station, city, district
 * 프론트: coordinates {x, y}, nearby_station
 */
export function transformStudioResponse(backendStudio: any): Studio {
  return {
    studio_id: backendStudio.studio_id,
    user_id: backendStudio.user_id,
    name: backendStudio.name,
    location: backendStudio.location,
    instagram: backendStudio.instagram || '',
    youtube: backendStudio.youtube,
    website: backendStudio.website,
    email: backendStudio.email,
    is_verified: backendStudio.is_verified,
    bio: backendStudio.bio,
    reservation_form: backendStudio.reservation_form,
    default_duration: backendStudio.default_duration,
    default_price: backendStudio.default_price,
    coordinates: backendStudio.lat && backendStudio.lng
      ? {
          x: backendStudio.lng,
          y: backendStudio.lat,
        }
      : undefined,
    nearby_station: backendStudio.station,
  };
}

/**
 * 백엔드 DancerResponse → 프론트 Dancer
 * 백엔드: main_name, names[]
 * 프론트: name (main_name 사용)
 */
export function transformDancerResponse(backendDancer: any): Dancer {
  return {
    dancer_id: backendDancer.dancer_id,
    name: backendDancer.main_name,
    instagram: backendDancer.instagram || '',
  };
}
