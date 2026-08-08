import { MoreHorizontal, Plus } from "lucide-react";
import type { Task, TaskStatus } from "../../types/task";
import { TaskCard } from "./TaskCard";

const titles: Record<TaskStatus, string> = {
  TODO: "To Do",
  DOING: "Doing",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold"
};

export function TaskColumn({
  status,
  tasks,
  onAdd
}: {
  status: TaskStatus;
  tasks: Task[];
  onAdd: (status: TaskStatus) => void;
}) {
  return (
    <section className="w-[280px] shrink-0 rounded-lg bg-neutral-100/80 p-1.5 dark:bg-neutral-900/80">
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="text-neutral-400">⁙</span>
          {titles[status]}
        </div>
        <div className="flex items-center gap-1 text-neutral-500">
          <button onClick={() => onAdd(status)} className="rounded p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <Plus size={13} />
          </button>
          <button className="rounded p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <button
        onClick={() => onAdd(status)}
        className="mt-1 flex w-full items-center gap-1 rounded-md px-2 py-2 text-[10px] text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        <Plus size={12} />
        Add Task
      </button>
    </section>
  );
}
