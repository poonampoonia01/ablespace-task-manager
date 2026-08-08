export type TaskStatus = "TODO" | "DOING" | "COMPLETED" | "ON_HOLD";
export type Priority = "NONE" | "URGENT" | "HIGH" | "MEDIUM" | "LOW";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string | null;
  reporter: User;
  members: { user: User }[];
  labels: { label: Label }[];
  subtasks?: Subtask[];
  comments?: CommentItem[];
  updates?: TaskUpdate[];
};

export type Subtask = {
  id: string;
  title: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string | null;
  assignee?: User | null;
};

export type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
};

export type TaskUpdate = {
  id: string;
  action: string;
  oldValue?: string | null;
  newValue?: string | null;
  createdAt: string;
  user: User;
};
