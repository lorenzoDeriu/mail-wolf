export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`brand-mark ${className}`}
      viewBox="0 0 40 40"
      width="40"
      height="40"
    >
      <path
        d="M6 18.2 20 7l14 11.2v14.3H6V18.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m10.5 20 9.5 7 9.5-7M10.5 29V19h19v10"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
