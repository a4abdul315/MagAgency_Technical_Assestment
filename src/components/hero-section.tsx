import Image from "next/image";
import { LeadForm } from "@/components/lead-form";

export function HeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center gap-8 lg:mr-[150px] lg:ml-[164px] lg:w-auto lg:flex-row lg:items-center lg:justify-between">
      <Image
        src="/assets/deco-squiggle-hero.svg"
        alt=""
        width={197}
        height={70}
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-6 hidden lg:block"
      />
      <Image
        src="/assets/deco-sparkle-hero.svg"
        alt=""
        width={68}
        height={68}
        aria-hidden
        className="pointer-events-none absolute -top-6 right-8 hidden lg:block"
      />

      <div className="flex w-full flex-col gap-8 lg:w-[48%]">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-5xl leading-[1.1] font-bold text-neutral-800 dark:text-neutral-300">
            FlowSpark
          </h1>
          <p className="max-w-[430px] font-sans text-base leading-[1.4] font-bold text-neutral-600 dark:text-neutral-300">
            DIGITAL MARKETING SOLUTIONS
          </p>
        </div>

        <p className="font-sans text-base leading-[1.4] text-neutral-800 dark:text-neutral-300">
          We believe that marketing shouldn&apos;t be a headache, so we&apos;ve crafted a platform
          that&apos;s super easy to use but doesn&apos;t skimp on the powerful stuff.
        </p>

        <Image
          src="/assets/hero-illustration.svg"
          alt=""
          width={223}
          height={223}
          className="mx-auto"
        />
      </div>

      <div className="flex w-full lg:w-[48%] lg:justify-end">
        <div className="w-full lg:max-w-md">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
