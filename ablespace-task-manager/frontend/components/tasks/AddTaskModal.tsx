"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { TaskStatus } from "../../types/task";
import { Button } from "../ui/Button";

export function AddTaskModal({
  status,
  userId,
  onClose,
  onCreated
}: {
  status: TaskStatus;
  userId: string;
  onClose: () => void;
  onCreated: (task: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const response = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status,
          priority: "NONE",
          reporterId: userId
        })
      });
      const task = await response.json();
      onCreated(task);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Add Task</h2>
          <button onClick={onClose}><X size={16} /></button>
        </div>

        <label className="mt-5 block text-[11px] text-neutral-500">Task name</label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="e.g. Design Homepage"
          className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-950"
        />

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </div>
    </div>
  );
}
