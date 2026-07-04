"use client";

import { Logo, GlobeIcon, ChatIcon, SupportIcon, UserCircleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScheduleCallButton } from "@/components/schedule/schedule-call-button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "#" },
];

function UtilityPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-neutral-200 px-2 py-1 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200">
      <span className="size-4">{icon}</span>
      <span className="font-display text-[10px] leading-[11px] font-semibold">{label}</span>
    </div>
  );
}

function scrollToLeadForm() {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  return (
    <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="hidden items-center gap-[29px] sm:flex">
          <UtilityPill icon={<GlobeIcon className="size-4" />} label="EN" />
          <UtilityPill icon={<ChatIcon className="size-4" />} label="CHAT TO SALES" />
          <UtilityPill icon={<SupportIcon className="size-4" />} label="SUPPORT" />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UtilityPill icon={<UserCircleIcon className="size-4" />} label="LOG IN" />
        </div>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-primary-100 px-4 py-8 dark:bg-neutral-600">
        <div className="flex items-center gap-4">
          <Logo className="h-[31px] w-auto text-primary-400" />
          <ul className="hidden items-center gap-4 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block rounded-full px-4 py-2 font-heading text-base leading-[11px] font-semibold text-primary-600 dark:text-neutral-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <ScheduleCallButton variant="primary" />
          <Button type="button" variant="outline" onClick={scrollToLeadForm}>
            Free trial
          </Button>
        </div>
      </nav>
    </div>
  );
}
