/** The "AL✝AR" wordmark — the middle T is drawn as a cross, like the key art. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display inline-flex items-center uppercase leading-none ${className}`}
      role="img"
      aria-label="Altar"
    >
      <span aria-hidden>AL</span>
      <svg
        viewBox="0 0 44 60"
        className="mx-[0.015em] inline-block h-[0.76em] w-auto"
        aria-hidden
        fill="currentColor"
      >
        <path d="M17 0h10v13h13v10H27v37H17V23H4V13h13z" />
      </svg>
      <span aria-hidden>AR</span>
    </span>
  );
}
