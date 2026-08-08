import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
