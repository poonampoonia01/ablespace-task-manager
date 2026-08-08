import type { Task, User } from "../types/task";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  return response.json();
}

export function guestLogin() {
  return request<{ user: User }>("/auth/guest", { method: "POST" });
}

export function getUsers() {
  return request<User[]>("/users");
}

export function getTasks(params?: URLSearchParams) {
  return request<Task[]>(`/tasks${params?.toString() ? `?${params}` : ""}`);
}

export function getTask(id: string) {
  return request<Task>(`/tasks/${id}`);
}

export function createTask(body: Record<string, unknown>) {
  return request<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function updateTask(id: string, body: Record<string, unknown>) {
  return request<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}

export function createComment(taskId: string, body: Record<string, unknown>) {
  return request(`/tasks/${taskId}/comments`, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function createSubtask(taskId: string, body: Record<string, unknown>) {
  return request(`/tasks/${taskId}/subtasks`, {
    method: "POST",
    body: JSON.stringify(body)
  });
}
