export default function RootLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy
      className="fixed inset-0 z-[9999] bg-black/80 grid place-items-center"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-[var(--bg)] border border-[var(--color-border)] px-5 py-4 shadow-2xl">
        {/* Spinner */}
        <svg
          className="size-6 motion-safe:animate-spin motion-reduce:animate-none text-[var(--color-primary)]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-90" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
        </svg>

        {/* Label */}
        <span className="text-sm font-medium text-[var(--color-foreground)]">로딩 중...</span>
      </div>
    </div>
  );
}
