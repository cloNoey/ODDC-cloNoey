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
    <div className="flex justify-center items-center">
      {/* 임시 텍스트 로고 - 추후 이미지/SVG로 교체 */}
      <h1 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold", className)}>
        ODDC
      </h1>
    </div>
  );
}
