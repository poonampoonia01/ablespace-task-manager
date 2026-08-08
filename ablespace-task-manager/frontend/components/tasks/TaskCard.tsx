"use client";

import Link from "next/link";
import { CalendarDays, MoreHorizontal, Tag } from "lucide-react";
import type { Task } from "../../types/task";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

export function TaskCard({ task }: { task: Task }) {
  const member = task.members[0]?.user ?? task.reporter;

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="block rounded-lg border border-neutral-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,.03)] transition hover:-translate-y-px hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="line-clamp-2 text-[11px] font-medium">{task.title}</span>
        <MoreHorizontal size={13} className="shrink-0 text-neutral-400" />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <Avatar user={member} size="xs" />
          <span className="truncate text-[10px] text-neutral-600 dark:text-neutral-300">
            {member.name}
          </span>
        </div>

        {task.dueDate && (
          <span className="flex shrink-0 items-center gap-1 rounded-md bg-red-50 px-1.5 py-1 text-[9px] text-red-500 dark:bg-red-950/30">
            <CalendarDays size={10} />
            {new Date(task.dueDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short"
            })}
          </span>
        )}
      </div>

      {task.labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.labels.slice(0, 2).map(({ label }) => (
            <Badge key={label.id}>
              <Tag size={9} />
              {label.name}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
