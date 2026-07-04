"use client";

import { useId } from "react";
import { ChevronDownIcon } from "@/components/icons";

export const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "USA" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+92", flag: "🇵🇰", label: "Pakistan" },
] as const;

export function PhoneInput({
  countryIndex,
  onCountryChange,
  value,
  onChange,
}: {
  countryIndex: number;
  onCountryChange: (index: number) => void;
  value: string;
  onChange: (value: string) => void;
}) {
  const selectId = useId();

  return (
    <div className="flex h-12 items-center rounded-md border border-neutral-600 bg-white dark:bg-neutral-600">
      <div className="relative flex h-full shrink-0 items-center border-r border-neutral-600">
        <label htmlFor={selectId} className="sr-only">
          Country code
        </label>
        <select
          id={selectId}
          value={countryIndex}
          onChange={(e) => onCountryChange(Number(e.target.value))}
          className="h-full appearance-none bg-transparent py-0 pr-7 pl-2 font-sans text-sm text-neutral-600 outline-none dark:text-neutral-200"
        >
          {COUNTRY_CODES.map((c, i) => (
            <option key={c.label} value={i} className="text-neutral-800">
              {c.label} ({c.code}) {c.flag}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2 size-3.5 text-neutral-600 dark:text-neutral-200" />
      </div>
      <input
        type="tel"
        placeholder="Phone number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full rounded-r-md bg-transparent px-3 font-sans text-neutral-800 outline-none dark:text-neutral-200"
      />
    </div>
  );
}
