"use client";

import { useTheme } from "next-themes";
import { DesktopIcon, SunIcon, MoonIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const options = [
  { value: "system", label: "Use system theme", Icon: DesktopIcon },
  { value: "light", label: "Use light theme", Icon: SunIcon },
  { value: "dark", label: "Use dark theme", Icon: MoonIcon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-4" role="radiogroup" aria-label="Theme">
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            suppressHydrationWarning
            className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-200"
          >
            <Icon className={cn("size-3.5", active && "text-primary-400")} suppressHydrationWarning />
            <span
              suppressHydrationWarning
              className={cn(
                "h-px w-3.5 bg-primary-400 transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
