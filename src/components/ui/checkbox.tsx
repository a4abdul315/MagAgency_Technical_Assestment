import { forwardRef, type InputHTMLAttributes } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <span className={cn("relative inline-flex size-6 shrink-0", className)}>
        <input ref={ref} type="checkbox" className="peer absolute inset-0 size-6 cursor-pointer opacity-0" {...props} />
        <span className="pointer-events-none flex size-6 items-center justify-center rounded-[3px] border-2 border-primary-400 bg-neutral-200 peer-checked:bg-primary-400 peer-checked:[&>svg]:block peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2">
          <CheckIcon className="hidden size-4 text-white" />
        </span>
      </span>
    );
  },
);
