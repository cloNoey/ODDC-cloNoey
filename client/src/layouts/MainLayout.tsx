import { Outlet } from "react-router-dom";

/**
 * MainLayout - 애플리케이션의 기본 레이아웃
 *
 * 반응형 동작:
 * - 모바일: 전체 너비 사용 (w-full)
 * - 데스크톱: 최대 440px, 중앙 정렬 (max-w-[440px] mx-auto)
 *
 * 추후 헤더/푸터/네비게이션 추가 예정
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* 메인 컨테이너: 모바일 퍼스트, 데스크톱 제한 너비 */}
      <div className="w-full max-w-[440px] mx-auto min-h-screen">
        {/* 헤더 영역 - 추후 추가 */}
        {/* <header className="sticky top-0 z-10 bg-white">
          <nav>...</nav>
        </header> */}

        {/* 메인 콘텐츠 - Outlet으로 자식 라우트 렌더링 */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* 푸터/하단 네비게이션 - 추후 추가 */}
        {/* <footer className="sticky bottom-0 z-10 bg-white">
          <nav>...</nav>
        </footer> */}
      </div>
    </div>
  );
}
