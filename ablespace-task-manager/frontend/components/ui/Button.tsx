import { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  variant = "dark",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "ghost" | "outline";
}) {
  const styles = {
    dark: "bg-neutral-900 text-white hover:bg-neutral-800",
    ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
    outline: "border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900"
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm transition ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
