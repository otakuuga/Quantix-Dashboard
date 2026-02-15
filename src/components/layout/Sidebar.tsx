import clsx from 'clsx';
import type { NavItem } from '../../types/fintech';

interface SidebarProps {
  items: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ items, activeKey, onSelect, open, onClose }: SidebarProps) {
  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-200 bg-white p-4 transition-transform dark:border-slate-800 dark:bg-slate-900',
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
      aria-label="Primary navigation"
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Quantix</h1>
        <button className="rounded p-2 md:hidden" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.key}
            className={clsx(
              'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm',
              activeKey === item.key
                ? 'bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-200'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
            onClick={() => {
              onSelect(item.key);
              onClose();
            }}
            aria-current={activeKey === item.key ? 'page' : undefined}
          >
            <span>{item.label}</span>
            {item.badgeCount ? (
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs dark:bg-slate-700">{item.badgeCount}</span>
            ) : null}
          </button>
        ))}
      </nav>
    </aside>
  );
}
