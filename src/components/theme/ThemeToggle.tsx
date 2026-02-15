import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
      aria-label="Toggle color theme"
      aria-pressed={mode === 'dark'}
    >
      {mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
}
