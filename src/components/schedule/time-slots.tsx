"use client";

import { cn } from "@/lib/utils";

export const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

export function TimeSlots({
  selected,
  bookedTimes,
  onSelect,
}: {
  selected: string | null;
  bookedTimes: Set<string>;
  onSelect: (time: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4" role="radiogroup" aria-label="Available times">
      {TIME_SLOTS.map((slot) => {
        const isBooked = bookedTimes.has(slot);
        const isSelected = selected === slot;

        return (
          <button
            key={slot}
            type="button"
            disabled={isBooked}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(slot)}
            className={cn(
              "font-sans h-[43px] w-[100px] shrink-0 rounded-full text-base font-bold transition-colors disabled:cursor-not-allowed",
              isBooked && "border-2 border-neutral-400 text-neutral-400 dark:border-neutral-600 dark:text-neutral-600",
              !isBooked && !isSelected && "border border-primary-400 text-primary-600 hover:bg-primary-100 dark:hover:bg-neutral-800",
              !isBooked && isSelected && "border border-primary-400 bg-primary-400 text-white",
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
