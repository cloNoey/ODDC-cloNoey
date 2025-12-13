import logoODDC from "@/assets/icons/logo_ODDC.svg";

interface LogoProps {
  className?: string;
}

/**
 * Logo 컴포넌트
 * 다른 페이지에서도 재사용 가능
 */
export default function Logo({ className }: LogoProps) {
  return (
    <div className="flex justify-center items-center">
      <img src={logoODDC} alt="ODDC Logo" className={className || "h-8"} />
    </div>
  );
}
