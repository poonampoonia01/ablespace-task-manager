"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronDown, Paperclip, Send, Share2, MoreHorizontal } from "lucide-react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { getTask, createComment } from "../../../lib/api";
import type { Priority, Task } from "../../../types/task";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
import { PriorityBadge } from "../../../components/tasks/PriorityBadge";
import { updateTask } from "../../../lib/api";

const priorityOptions: Priority[] = ["NONE", "URGENT", "HIGH", "MEDIUM", "LOW"];

export default function TaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const [task, setTask] = useState<Task | null>(null);
  const [comment, setComment] = useState("");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    params.then(({ taskId: id }) => {
      setTaskId(id);
      getTask(id).then(setTask);
    });
  }, [params]);

  async function changePriority(priority: Priority) {
    if (!task) return;
    const updated = await updateTask(task.id, { priority });
    setTask(updated);
    setPriorityOpen(false);
  }

  async function postComment() {
    if (!task || !comment.trim()) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const created = await createComment(task.id, {
      userId: user.id,
      content: comment.trim()
    });
    setTask((current) =>
      current
        ? {
            ...current,
            comments: [...(current.comments ?? []), created as any]
          }
        : current
    );
    setComment("");
  }

  if (!task) {
    return (
      <AppLayout>
        <div className="p-8 text-sm text-neutral-500">Loading task...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/tasks" className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            <ArrowLeft size={14} /> Tasks
          </Link>

          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-neutral-200 p-2 dark:border-neutral-700"><Share2 size={14} /></button>
            <button className="rounded-lg border border-neutral-200 p-2 dark:border-neutral-700"><MoreHorizontal size={14} /></button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <section>
            <h1 className="text-xl font-semibold tracking-tight">{task.title}</h1>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-neutral-500">
              {task.description ??
                "Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively."}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[11px]">
              <div>
                <span className="text-neutral-400">Properties</span>
                <span className="ml-2 inline-flex items-center gap-1">
                  <Avatar user={task.reporter} size="xs" /> {task.reporter.name}
                </span>
              </div>

              <div>
                <span className="text-neutral-400">Due</span>
                <span className="ml-2">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-neutral-400">Labels</span>
              {task.labels.map(({ label }) => (
                <Badge key={label.id}>{label.name}</Badge>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-400">
              Resources
              <span className="rounded-md border border-dashed border-neutral-300 px-2 py-1 text-neutral-500 dark:border-neutral-700">
                + Add document or link...
              </span>
            </div>

            <section className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-semibold">Subtasks</h2>
                <button className="text-[10px] text-neutral-500">+ Add Subtasks</button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
                <div className="min-w-[620px]">
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_30px] bg-neutral-100 px-3 py-2 text-[10px] text-neutral-500 dark:bg-neutral-900">
                    <span>Task</span><span>Priority</span><span>Members</span><span>Due Date</span><span>Actions</span>
                  </div>
                  {(task.subtasks ?? []).map((subtask) => (
                    <div key={subtask.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_30px] items-center border-t border-neutral-200 px-3 py-3 text-[11px] dark:border-neutral-800">
                      <span>{subtask.title}</span>
                      <PriorityBadge priority={subtask.priority} />
                      <span>{subtask.assignee ? <Avatar user={subtask.assignee} size="xs" /> : "+"}</span>
                      <span className="text-neutral-500">
                        {subtask.dueDate ? new Date(subtask.dueDate).toLocaleDateString("en-GB") : "—"}
                      </span>
                      <MoreHorizontal size={13} className="text-neutral-400" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-7">
              <h2 className="mb-2 text-xs font-semibold">Updates</h2>
              <div className="space-y-2">
                {(task.updates ?? []).map((item) => (
                  <div key={item.id} className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Avatar user={item.user} size="sm" />
                      <div>
                        <p className="text-[11px] font-medium">{item.user.name}</p>
                        <p className="text-[10px] text-neutral-500">
                          {item.action}
                          {item.oldValue ? ` from ${item.oldValue}` : ""}
                          {item.newValue ? ` to ${item.newValue}` : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <h2 className="mb-2 text-xs font-semibold">Comments</h2>

              <div className="rounded-lg border border-neutral-200 dark:border-neutral-800">
                {(task.comments ?? []).map((item) => (
                  <div key={item.id} className="border-b border-neutral-200 p-3 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Avatar user={item.user} size="sm" />
                      <div>
                        <p className="text-[11px] font-medium">{item.user.name}</p>
                        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 p-3">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && postComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-xs outline-none"
                  />
                  <button className="text-neutral-400"><Paperclip size={14} /></button>
                  <button onClick={postComment} className="text-neutral-700 dark:text-neutral-200"><Send size={14} /></button>
                </div>
              </div>
            </section>
          </section>

          <aside className="h-fit rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-200 p-3 dark:border-neutral-800">
              <span className="text-xs font-semibold">Details</span>
              <span className="text-neutral-400">+</span>
            </div>

            <div className="space-y-4 p-4 text-[11px]">
              <div className="flex justify-between">
                <span className="text-neutral-400">Status</span>
                <span>{task.status.replace("_", " ")}</span>
              </div>

              <div className="relative flex justify-between">
                <span className="text-neutral-400">Priority</span>
                <button
                  onClick={() => setPriorityOpen((v) => !v)}
                  className="flex items-center gap-1"
                >
                  <PriorityBadge priority={task.priority} />
                  <ChevronDown size={11} />
                </button>

                {priorityOpen && (
                  <div className="absolute right-0 top-6 z-20 w-40 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                    {priorityOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => changePriority(option)}
                        className="block w-full rounded px-2 py-2 text-left text-[11px] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <PriorityBadge priority={option} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Members</span>
                <div className="flex -space-x-1">
                  {task.members.map(({ user }) => <Avatar key={user.id} user={user} size="xs" />)}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Dates</span>
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-GB") : "No date"}
                </span>
              </div>

              <div>
                <p className="mb-2 text-neutral-400">Labels</p>
                <div className="flex flex-wrap gap-1">
                  {task.labels.map(({ label }) => <Badge key={label.id}>{label.name}</Badge>)}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Reporter</span>
                <span>{task.reporter.name}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
