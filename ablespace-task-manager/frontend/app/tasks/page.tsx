"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Plus, Search, X } from "lucide-react";
import { AppLayout } from "../../components/layout/AppLayout";
import { getTasks } from "../../lib/api";
import type { Task, TaskStatus } from "../../types/task";
import { TaskColumn } from "../../components/tasks/TaskColumn";
import { TaskList } from "../../components/tasks/TaskList";
import { FieldsMenu, Fields } from "../../components/tasks/FieldsMenu";
import { AddTaskModal } from "../../components/tasks/AddTaskModal";
import { Button } from "../../components/ui/Button";

const defaultFields: Fields = {
  priority: true,
  members: true,
  dueDate: true,
  labels: true,
  status: false,
  reporter: false
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<"board" | "list">("board");
  const [fields, setFields] = useState<Fields>(defaultFields);
  const [showFields, setShowFields] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [priority, setPriority] = useState("");
  const [modalStatus, setModalStatus] = useState<TaskStatus | null>(null);
  const [userId, setUserId] = useState("");

  async function loadTasks() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (priority) params.set("priority", priority);
    const data = await getTasks(params);
    setTasks(data);
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setUserId(JSON.parse(user).id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(loadTasks, 250);
    return () => clearTimeout(timer);
  }, [search, priority]);

  const groups = useMemo(
    () => ({
      TODO: tasks.filter((t) => t.status === "TODO"),
      DOING: tasks.filter((t) => t.status === "DOING"),
      COMPLETED: tasks.filter((t) => t.status === "COMPLETED"),
      ON_HOLD: tasks.filter((t) => t.status === "ON_HOLD")
    }),
    [tasks]
  );

  function addCreated(task: Task) {
    setTasks((current) => [task, ...current]);
    setModalStatus(null);
  }

  return (
    <AppLayout>
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-sm font-semibold">Tasks</h1>

          <div className="relative flex items-center gap-1.5">
            {searchOpen && (
              <div className="flex items-center rounded-lg border border-neutral-200 bg-white px-2 dark:border-neutral-700 dark:bg-neutral-900">
                <Search size={13} className="text-neutral-400" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks"
                  className="w-40 bg-transparent px-2 py-2 text-[11px] outline-none"
                />
                <button onClick={() => { setSearch(""); setSearchOpen(false); }}>
                  <X size={13} />
                </button>
              </div>
            )}

            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                <Search size={14} />
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowFields((v) => !v)}
                className="rounded-lg border border-neutral-200 px-2.5 py-2 text-[11px] hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                ▦ Fields
              </button>
              {showFields && (
                <FieldsMenu
                  fields={fields}
                  setFields={setFields}
                  view={view}
                  setView={setView}
                />
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilter((v) => !v)}
                className="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                <Filter size={14} />
              </button>

              {showFilter && (
                <div className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                  <p className="mb-2 text-[10px] font-semibold">Priority</p>
                  {["", "URGENT", "HIGH", "MEDIUM", "LOW"].map((value) => (
                    <button
                      key={value || "all"}
                      onClick={() => { setPriority(value); setShowFilter(false); }}
                      className="block w-full rounded px-2 py-2 text-left text-[11px] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {value || "All priorities"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={() => setModalStatus("TODO")} className="gap-1">
              <Plus size={14} />
              Add Task
            </Button>
          </div>
        </div>

        {view === "board" ? (
          <div className="flex gap-3 overflow-x-auto pb-4">
            {(["TODO", "DOING", "COMPLETED", "ON_HOLD"] as TaskStatus[]).map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={groups[status]}
                onAdd={setModalStatus}
              />
            ))}
          </div>
        ) : (
          <TaskList tasks={tasks} onAdd={setModalStatus} fields={fields} />
        )}
      </div>

      {modalStatus && (
        <AddTaskModal
          status={modalStatus}
          userId={userId}
          onClose={() => setModalStatus(null)}
          onCreated={addCreated}
        />
      )}
    </AppLayout>
  );
}
