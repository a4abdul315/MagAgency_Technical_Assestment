"use client";

import { useState } from "react";
import { Carousel } from "@/components/carousel";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    slug: "effortless-interface",
    title: "Effortless interface",
    description: "Simplify your marketing",
  },
  {
    slug: "seamless-connections",
    title: "Seamless connections",
    description: "Total sync with your tools",
  },
  {
    slug: "tailored-experience",
    title: "Tailored experience",
    description: "Customise with ease",
  },
  {
    slug: "all-in-one-platform",
    title: "All-in-One platform",
    description: "Unified marketing mastery",
  },
  {
    slug: "smart-insights",
    title: "Smart insights",
    description: "AI-powered marketing intelligence",
  },
];

function imagesFor(slug: string) {
  return [1, 2, 3].map((n) => `https://picsum.photos/seed/flowspark-${slug}-${n}/460/460`);
}

export function FeaturesSection() {
  const [activeSlug, setActiveSlug] = useState(FEATURES[0].slug);

  return (
    <section
      id="features"
      className="mx-auto flex w-full max-w-[1064px] flex-col gap-4 rounded-[20px] bg-primary-100 p-8 lg:flex-row lg:justify-between lg:p-16 dark:bg-neutral-600"
    >
      <div className="flex w-full flex-col gap-8 lg:w-[415px]">
        <h2 className="font-heading text-4xl font-semibold text-neutral-800 dark:text-neutral-300">
          FlowSpark features
        </h2>

        <ul className="flex flex-col gap-4">
          {FEATURES.map((feature) => {
            const isActive = feature.slug === activeSlug;
            return (
              <li key={feature.slug}>
                <button
                  type="button"
                  onClick={() => setActiveSlug(feature.slug)}
                  aria-pressed={isActive}
                  className="flex w-full items-center gap-4 text-left"
                >
                  <span
                    className={cn(
                      "h-12 w-1 shrink-0 rounded-full",
                      isActive ? "bg-primary-400" : "bg-primary-200",
                    )}
                  />
                  <span className="flex flex-col gap-1">
                    <span className="font-sans font-bold text-neutral-800 dark:text-neutral-200">
                      {feature.title}
                    </span>
                    <span className="font-sans text-neutral-800 dark:text-neutral-300">
                      {feature.description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="font-sans text-neutral-800 dark:text-neutral-300">
          Experience simplicity with our user-friendly interface, designed for effortless
          navigation. Transform complex tasks into simple actions, enhancing productivity and
          strategic focus. Enjoy a seamless experience that drives results and optimizes your
          marketing efforts efficiently.
        </p>

        <button
          type="button"
          className="inline-flex h-12 w-fit items-center justify-center rounded-full border-2 border-primary-400 px-8 font-sans font-bold text-primary-600 hover:bg-primary-200/50 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          See more features
        </button>
      </div>

      <Carousel key={activeSlug} images={imagesFor(activeSlug)} />
    </section>
  );
}
