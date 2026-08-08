"use client";

import Link from "next/link";
import { MoreHorizontal, Plus } from "lucide-react";
import type { Task, TaskStatus } from "../../types/task";
import { Avatar } from "../ui/Avatar";
import { PriorityBadge } from "./PriorityBadge";

const titles: Record<TaskStatus, string> = {
  TODO: "To Do",
  DOING: "Doing",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold"
};

export function TaskList({
  tasks,
  onAdd,
  fields
}: {
  tasks: Task[];
  onAdd: (status: TaskStatus) => void;
  fields: {
    priority: boolean;
    members: boolean;
    dueDate: boolean;
    labels: boolean;
    status: boolean;
    reporter: boolean;
  };
}) {
  const groups: TaskStatus[] = ["TODO", "DOING", "COMPLETED", "ON_HOLD"];

  return (
    <div className="space-y-5">
      {groups.map((status) => {
        const group = tasks.filter((task) => task.status === status);
        if (!group.length) return null;

        return (
          <section key={status}>
            <div className="mb-2 flex items-center gap-1 text-xs font-medium">
              <span>⌄</span>{titles[status]}
            </div>

            <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_40px] bg-neutral-100 px-3 py-2 text-[10px] text-neutral-500 dark:bg-neutral-900">
                  <span>Task</span>
                  <span>{fields.priority ? "Priority" : ""}</span>
                  <span>{fields.members ? "Members" : ""}</span>
                  <span>{fields.dueDate ? "Due Date" : ""}</span>
                  <span>Actions</span>
                </div>

                {group.map((task) => {
                  const member = task.members[0]?.user ?? task.reporter;
                  return (
                    <Link
                      href={`/tasks/${task.id}`}
                      key={task.id}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_40px] items-center border-t border-neutral-200 px-3 py-3 text-[11px] hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    >
                      <span className="font-medium">{task.title}</span>
                      <span>{fields.priority && <PriorityBadge priority={task.priority} />}</span>
                      <span>
                        {fields.members && (
                          <div className="flex items-center gap-1">
                            <Avatar user={member} size="xs" />
                            {member.name === "Guest" ? "" : member.name}
                          </div>
                        )}
                      </span>
                      <span className="text-neutral-500">
                        {fields.dueDate && task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })
                          : ""}
                      </span>
                      <MoreHorizontal size={14} className="text-neutral-400" />
                    </Link>
                  );
                })}

                <button
                  onClick={() => onAdd(status)}
                  className="flex w-full items-center gap-1 border-t border-neutral-200 px-3 py-2 text-[10px] text-neutral-500 dark:border-neutral-800"
                >
                  <Plus size={12} /> Add Task
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
