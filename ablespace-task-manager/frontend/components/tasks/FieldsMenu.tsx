import { Check, Columns3 } from "lucide-react";

export type Fields = {
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  labels: boolean;
  status: boolean;
  reporter: boolean;
};

export function FieldsMenu({
  fields,
  setFields,
  view,
  setView
}: {
  fields: Fields;
  setFields: React.Dispatch<React.SetStateAction<Fields>>;
  view: "board" | "list";
  setView: (view: "board" | "list") => void;
}) {
  const items: [keyof Fields, string][] = [
    ["priority", "Priority"],
    ["members", "Members"],
    ["dueDate", "Due Date"],
    ["labels", "Labels"],
    ["status", "Status"],
    ["reporter", "Reporter"]
  ];

  return (
    <div className="absolute right-0 top-10 z-30 w-52 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mb-2 flex overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setView("list")}
          className={`flex-1 px-3 py-2 text-[11px] ${view === "list" ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
        >
          ≡ List
        </button>
        <button
          onClick={() => setView("board")}
          className={`flex-1 px-3 py-2 text-[11px] ${view === "board" ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
        >
          ▦ Board
        </button>
      </div>

      {items.map(([key, label]) => (
        <button
          key={key}
          onClick={() => setFields((prev) => ({ ...prev, [key]: !prev[key] }))}
          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-[11px] hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {label}
          {fields[key] ? <Check size={13} /> : <span className="h-3 w-3 rounded bg-neutral-200 dark:bg-neutral-700" />}
        </button>
      ))}

      <div className="mt-1 flex items-center gap-1 px-2 text-[9px] text-neutral-400">
        <Columns3 size={10} /> Customize visible fields
      </div>
    </div>
  );
}
