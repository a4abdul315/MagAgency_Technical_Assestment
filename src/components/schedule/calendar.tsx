"use client";

import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildMonthGrid(viewedMonth: Date) {
  const year = viewedMonth.getFullYear();
  const month = viewedMonth.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // getDay(): 0=Sun..6=Sat -> convert to Mon-start offset
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;

  const cells: Array<Date | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  return cells;
}

export function Calendar({
  selected,
  onSelect,
  today,
}: {
  selected: Date;
  onSelect: (date: Date) => void;
  today: Date;
}) {
  const todayStart = useMemo(() => startOfDay(today), [today]);
  const [viewedMonth, setViewedMonth] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));

  const cells = useMemo(() => buildMonthGrid(viewedMonth), [viewedMonth]);
  const isCurrentMonth =
    viewedMonth.getFullYear() === todayStart.getFullYear() && viewedMonth.getMonth() === todayStart.getMonth();

  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          aria-label="Previous month"
          disabled={isCurrentMonth}
          onClick={() => setViewedMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          className="text-neutral-600 disabled:opacity-30 dark:text-neutral-300"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <p className="font-picker text-base font-semibold tracking-[-0.32px] text-neutral-600 dark:text-neutral-300">
          {MONTH_NAMES[viewedMonth.getMonth()]} {viewedMonth.getFullYear()}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setViewedMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          className="text-neutral-600 dark:text-neutral-300"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="font-picker py-2 text-center text-sm tracking-[-0.28px] text-neutral-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={`blank-${i}`} className="h-10" />;

          const isPast = startOfDay(date) < todayStart;
          const isSelected = toISODate(date) === toISODate(selected);

          return (
            <div key={toISODate(date)} className="flex h-10 items-center justify-center">
              <button
                type="button"
                disabled={isPast}
                aria-pressed={isSelected}
                aria-label={date.toDateString()}
                onClick={() => onSelect(date)}
                className={cn(
                  "font-picker flex size-10 items-center justify-center rounded-full text-base tracking-[-0.32px] disabled:cursor-not-allowed",
                  isPast && "text-neutral-400",
                  !isPast && !isSelected && "text-neutral-600 hover:bg-primary-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                  isSelected && "bg-primary-400 font-semibold text-white",
                )}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { toISODate };
