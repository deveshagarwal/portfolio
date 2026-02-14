export function LetterboxdLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="40" r="20" fill="currentColor" />
      <circle cx="40" cy="40" r="20" fill="currentColor" />
      <circle cx="60" cy="40" r="20" fill="currentColor" />
    </svg>
  );
}
