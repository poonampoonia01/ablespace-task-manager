export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
      {children}
    </span>
  );
}
