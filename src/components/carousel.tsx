"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

const SLIDE_DURATION_MS = 3000;

// Keyed by slide index from the parent so each slide change fully remounts
// this component — a fresh `filled` state per mount, no reset-on-prop-change
// effect needed.
function ProgressBar() {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    // Two rAFs force the browser to paint the 0%-width state before the
    // transition to 100% starts, so the fill animation plays from the start.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setFilled(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-primary-400/20">
      <div
        className="h-full rounded-full bg-primary-400"
        style={{
          width: filled ? "100%" : "0%",
          transition: filled ? `width ${SLIDE_DURATION_MS}ms linear` : "none",
        }}
      />
    </div>
  );
}

export function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [index, images.length]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex w-full flex-col gap-4 lg:w-115">
      <div className="relative aspect-square w-full overflow-hidden rounded-[20px]">
        <Image
          key={images[index]}
          src={images[index]}
          alt=""
          fill
          sizes="460px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto flex w-32.25 flex-col items-center gap-2.5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="flex size-8 items-center justify-center rounded-md border-2 border-primary-400 p-1.5 text-primary-400"
          >
            <ArrowLeftIcon className="size-5" />
          </button>
          <span className="font-sans text-base text-neutral-800 dark:text-neutral-300">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="flex size-8 items-center justify-center rounded-md border-2 border-primary-400 p-1.5 text-primary-400"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
        <ProgressBar key={index} />
      </div>
    </div>
  );
}
