import { useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { SIDEBAR_NAV } from '../../config/navigation';
import type { DashboardRoute } from '../../types/fintech';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface DashboardLayoutProps extends PropsWithChildren {
  initialRoute: DashboardRoute;
}

export function DashboardLayout({ initialRoute, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [route, setRoute] = useState<DashboardRoute>(initialRoute);

  const activeTitle = useMemo(() => {
    const hit = SIDEBAR_NAV.find((item) => item.key === route.navKey);
    return hit?.label ?? route.title;
  }, [route]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        items={SIDEBAR_NAV}
        activeKey={route.navKey}
        onSelect={(key) => setRoute({ navKey: key, title: key })}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="md:pl-64">
        <main className="px-4 md:px-6">
          <TopNav title={activeTitle} onOpenSidebar={() => setSidebarOpen(true)} />
          {children}
        </main>
      </div>
    </div>
  );
}
