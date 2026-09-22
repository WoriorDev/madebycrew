export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 88 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M34.5 8.5C26.2 8.5 19.5 15.2 19.5 23.5C19.5 31.8 26.2 38.5 34.5 38.5C38.4 38.5 41.9 37 44.5 34.5"
        stroke="#D7FF32"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M53.5 39.5C61.8 39.5 68.5 32.8 68.5 24.5C68.5 16.2 61.8 9.5 53.5 9.5C49.6 9.5 46.1 11 43.5 13.5"
        stroke="#F7F8FA"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandWordmark({
  className = "text-lg",
}: {
  className?: string;
}) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-bold tracking-tight ${className}`}
    >
      MadeByCrew
      <span className="text-lime">.pl</span>
    </span>
  );
}
