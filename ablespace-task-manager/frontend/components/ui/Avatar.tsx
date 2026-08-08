import type { User } from "../../types/task";

export function Avatar({ user, size = "sm" }: { user: User; size?: "xs" | "sm" | "md" }) {
  const sizes = { xs: "h-5 w-5 text-[9px]", sm: "h-6 w-6 text-[10px]", md: "h-8 w-8 text-xs" };

  return (
    <div className={`overflow-hidden rounded-full bg-neutral-200 ${sizes[size]}`}>
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium">
          {user.name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}
