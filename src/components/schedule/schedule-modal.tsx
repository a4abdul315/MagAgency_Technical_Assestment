"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useScheduleCall } from "@/components/schedule/schedule-call-context";
import { Calendar, toISODate } from "@/components/schedule/calendar";
import { TimeSlots } from "@/components/schedule/time-slots";
import { CalendarIcon, CloseIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { bookingSchema, type BookingInput } from "@/lib/validation";
import type { BookingSummary } from "@/types/booking";

type Status = "idle" | "submitting" | "success" | "error";

export function ScheduleModal() {
  const { isOpen } = useScheduleCall();
  // Mounting a fresh dialog instance per open (instead of toggling visibility
  // on a persistent instance) gives every piece of local state — form,
  // selected date/time, submit status — a clean slate for free.
  return isOpen ? <ScheduleModalDialog /> : null;
}

function ScheduleModalDialog() {
  const { close } = useScheduleCall();

  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingSummary[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { consent: false as unknown as true },
  });

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings ?? []))
      .catch(() => setBookings([]));

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  const bookedTimes = useMemo(() => {
    const iso = toISODate(selectedDate);
    return new Set(bookings.filter((b) => b.date === iso).map((b) => b.time));
  }, [bookings, selectedDate]);

  const onSubmit = async (data: BookingInput) => {
    if (!selectedTime) {
      setServerError("Please select a time slot.");
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: toISODate(selectedDate),
          time: selectedTime,
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        setServerError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-[1152px] overflow-y-auto rounded-[20px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] dark:bg-neutral-800"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-6 right-5 flex size-12 items-center justify-center rounded-md bg-accent-400 p-3"
        >
          <CloseIcon className="size-6 text-white" />
        </button>

        <h2
          id="schedule-modal-title"
          className="font-heading pr-16 text-3xl font-semibold text-neutral-800 lg:pr-0 dark:text-neutral-300"
        >
          Schedule a call at a time that suits you
        </h2>

        {status === "success" ? (
          <div className="mt-16 rounded-[20px] bg-primary-100 p-8 text-center dark:bg-neutral-600">
            <p className="font-sans text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Thanks — your call is booked!
            </p>
            <p className="mt-2 font-sans text-neutral-600 dark:text-neutral-300">
              We&apos;ll see you on {selectedDate.toDateString()} at {selectedTime}.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary-400 px-8 font-sans font-bold text-primary-100 dark:text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:justify-center">
              <div className="w-full lg:w-[345px]">
                <p className="font-picker text-sm tracking-[-0.28px] text-neutral-600 dark:text-neutral-300">
                  Select a date
                </p>
                <div className="mt-2 overflow-hidden rounded-md border border-primary-400">
                  <div className="flex h-12 items-center justify-between rounded-t-md border-b border-primary-400 bg-white px-3 dark:bg-neutral-800">
                    <span className="font-picker text-base tracking-[-0.32px] text-neutral-600 dark:text-neutral-300">
                      {String(selectedDate.getDate()).padStart(2, "0")} /{" "}
                      {String(selectedDate.getMonth() + 1).padStart(2, "0")} /{" "}
                      {selectedDate.getFullYear()}
                    </span>
                    <CalendarIcon className="size-6 text-neutral-400" />
                  </div>
                  <div className="bg-white p-3 dark:bg-neutral-600">
                    <Calendar selected={selectedDate} onSelect={setSelectedDate} today={today} />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[340px]">
                <p className="font-picker text-sm tracking-[-0.28px] text-neutral-600 dark:text-neutral-300">
                  Select a time
                </p>
                <div className="mt-2">
                  <TimeSlots selected={selectedTime} bookedTimes={bookedTimes} onSelect={setSelectedTime} />
                </div>
                {!selectedTime && serverError === "Please select a time slot." && (
                  <p className="mt-2 text-sm text-red-600">{serverError}</p>
                )}
              </div>
            </div>

            <div className="mt-16 flex flex-col gap-8 rounded-[20px] bg-primary-100 p-8 lg:flex-row dark:bg-neutral-600">
              <div className="flex w-full flex-col gap-4 lg:w-[496px]">
                <Field label="Full name" error={errors.fullName?.message}>
                  <input
                    {...register("fullName")}
                    type="text"
                    className={inputClass}
                    placeholder="Full name"
                  />
                </Field>
                <Field label="Email address" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    className={inputClass}
                    placeholder="Email address"
                  />
                </Field>
                <Field label="Company name" error={errors.companyName?.message}>
                  <input
                    {...register("companyName")}
                    type="text"
                    className={inputClass}
                    placeholder="Company name"
                  />
                </Field>
                <Field label="Phone number" error={errors.phone?.message}>
                  <div className="flex h-12 items-center rounded-md border border-neutral-600 bg-white dark:bg-neutral-600">
                    <span className="flex h-full items-center gap-1 border-r border-neutral-600 px-2 font-sans text-sm text-neutral-600 dark:text-neutral-200">
                      🇺🇸 +1
                    </span>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Phone number"
                      className="h-full w-full rounded-r-md bg-transparent px-3 font-sans text-neutral-800 outline-none dark:text-neutral-200"
                    />
                  </div>
                </Field>
              </div>

              <div className="flex w-full flex-col gap-4 lg:w-[496px]">
                <Field label="Call notes" error={errors.notes?.message}>
                  <textarea
                    {...register("notes")}
                    rows={6}
                    placeholder="Anything you'd like us to know ahead of the call?"
                    className="h-[179px] w-full resize-none rounded-md border border-neutral-600 bg-white p-2.5 font-sans text-neutral-800 outline-none dark:bg-neutral-600 dark:text-neutral-200"
                  />
                </Field>

                <label className="flex items-start gap-2.5">
                  <Checkbox {...register("consent")} />
                  <span className="font-sans text-neutral-600 dark:text-neutral-300">
                    I consent to my details being processed in line with the{" "}
                    <a href="#" className="underline">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-sm text-red-600">{errors.consent.message}</p>
                )}

                {serverError && serverError !== "Please select a time slot." && (
                  <p role="alert" className="text-sm text-red-600">
                    {serverError}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-primary-400 px-8 font-sans font-bold text-white transition-colors hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Scheduling…" : "Schedule my call"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-md border border-neutral-600 bg-white p-3 font-sans text-neutral-800 outline-none focus:border-primary-400 dark:bg-neutral-600 dark:text-neutral-200";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-neutral-600 dark:text-neutral-300">{label}</span>
      {children}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  );
}
