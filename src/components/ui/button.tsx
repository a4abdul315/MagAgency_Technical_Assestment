import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 shrink-0 items-center justify-center gap-4 rounded-full px-8 py-4 font-sans text-base font-bold leading-[1.4] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-primary-400 text-primary-100 hover:bg-primary-500 dark:text-white",
        variant === "outline" &&
          "border-2 border-primary-400 text-primary-600 hover:bg-primary-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}
