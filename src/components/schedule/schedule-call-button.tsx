"use client";

import { Button } from "@/components/ui/button";
import { useScheduleCall } from "@/components/schedule/schedule-call-context";
import { cn } from "@/lib/utils";

export function ScheduleCallButton({
  variant = "primary",
  className,
}: {
  variant?: "primary" | "outline";
  className?: string;
}) {
  const { open } = useScheduleCall();

  return (
    <Button type="button" variant={variant} className={cn(className)} onClick={open}>
      Schedule a call
    </Button>
  );
}

export function FooterScheduleCallButton() {
  const { open } = useScheduleCall();

  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary-400 px-8 py-4 font-heading text-base leading-[11px] font-semibold text-primary-100 hover:bg-primary-500 dark:text-white"
    >
      Schedule a call
    </button>
  );
}
