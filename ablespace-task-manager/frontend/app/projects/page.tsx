import { AppLayout } from "../../components/layout/AppLayout";

export default function ProjectsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-sm font-semibold">Projects</h1>
        <p className="mt-2 text-xs text-neutral-500">
          Projects navigation is included to match the workspace structure shown in the supplied design.
        </p>
      </div>
    </AppLayout>
  );
}
