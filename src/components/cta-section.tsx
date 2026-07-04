"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScheduleCallButton } from "@/components/schedule/schedule-call-button";

function scrollToLeadForm() {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CtaSection() {
  return (
    <section className="relative mx-auto flex w-full max-w-[632px] flex-col items-center gap-8 text-center">
      <Image
        src="/assets/deco-squiggle-cta.svg"
        alt=""
        width={187}
        height={68}
        aria-hidden
        className="pointer-events-none absolute top-[125px] left-[497px] hidden lg:block"
      />

      <h2 className="font-heading text-4xl font-semibold text-neutral-800 dark:text-neutral-300">
        Want to see how we can help?
      </h2>

      <p className="max-w-[430px] font-sans text-neutral-800 dark:text-neutral-300">
        Ready to transform your marketing? Book a demo or start your free trial today and see
        firsthand how we can make your marketing efforts more effective and enjoyable!
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          <ScheduleCallButton variant="primary" />
          <Button type="button" variant="outline" onClick={scrollToLeadForm}>
            Start a free trial
          </Button>
        </div>
        <p className="font-sans text-neutral-400">Free 14-day trial. Cancel anytime.</p>
      </div>
    </section>
  );
}
