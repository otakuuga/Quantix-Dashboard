import { ThemeToggle } from '../theme/ThemeToggle';

interface TopNavProps {
  title: string;
  onOpenSidebar: () => void;
}

export function TopNav({ title, onOpenSidebar }: TopNavProps) {
  return (
    <header className="sticky top-0 z-20 mb-6 flex items-center justify-between border-b border-slate-200 bg-slate-100/95 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex items-center gap-3">
        <button className="rounded border border-slate-300 px-2 py-1 md:hidden dark:border-slate-700" onClick={onOpenSidebar}>
          ☰
        </button>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Session 1</p>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
