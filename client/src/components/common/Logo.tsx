import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * Logo 컴포넌트
 * 다른 페이지에서도 재사용 가능
 * 추후 이미지/SVG로 교체 예정
 */
export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      {/* 임시 텍스트 로고 - 추후 이미지/SVG로 교체 */}
      <h1 className="text-2xl font-bold">ODDC</h1>
    </div>
  );
}
