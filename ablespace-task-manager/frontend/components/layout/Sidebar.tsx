"use client";

import Link from "next/link";
import { CheckSquare2, ChevronDown, Folder, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../shared/ThemeProvider";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-3 top-3 z-50 rounded-lg border bg-white p-2 lg:hidden dark:border-neutral-700 dark:bg-neutral-900"
      >
        <Menu size={16} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[198px] border-r border-neutral-200 bg-neutral-50 px-3 py-4 transition-transform lg:static lg:translate-x-0 dark:border-neutral-800 dark:bg-neutral-950 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-7 flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-neutral-200">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            Dexter
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={15} />
          </button>
        </div>

        <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-neutral-500">
          <span>Workspace</span>
          <ChevronDown size={13} />
        </div>

        <nav className="space-y-1">
          <Link
            href="/tasks"
            className="flex items-center gap-2 rounded-lg bg-neutral-200/70 px-2 py-2 text-xs font-medium dark:bg-neutral-800"
          >
            <CheckSquare2 size={14} />
            Tasks
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs hover:bg-neutral-200/60 dark:hover:bg-neutral-800"
          >
            <Folder size={14} />
            Projects
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="mt-6 flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-neutral-500 hover:bg-neutral-200/60 dark:hover:bg-neutral-800"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </aside>

      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
