import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { mode, setMode, resolvedMode } = useTheme();

  return (
    <div className="flex items-center gap-2" aria-label="Theme controls">
      <button
        type="button"
        onClick={() => setMode('light')}
        className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-700"
        aria-pressed={mode === 'light'}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setMode('dark')}
        className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-700"
        aria-pressed={mode === 'dark'}
      >
        Dark
      </button>
      <button
        type="button"
        onClick={() => setMode('system')}
        className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-700"
        aria-pressed={mode === 'system'}
      >
        System
      </button>
      <span className="text-xs text-slate-500 dark:text-slate-400">Active: {resolvedMode}</span>
    </div>
  );
}
