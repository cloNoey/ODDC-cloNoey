import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { MainPage, SearchPage } from "@/pages";

function App() {
  return (
    <Routes>
      {/* Layout Route: MainLayout이 모든 자식 라우트를 감쌈 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* 추후 라우트 추가 시 여기에 추가 */}
      </Route>
    </Routes>
  );
}

export default App;
