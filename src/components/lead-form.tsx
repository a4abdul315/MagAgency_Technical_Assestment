"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { consent: false as unknown as true },
  });

  const onSubmit = async (data: LeadInput) => {
    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();

      if (!res.ok) {
        setServerError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        id="lead-form"
        className="flex w-full flex-col gap-4 rounded-[20px] bg-primary-100 p-8 dark:bg-neutral-600"
      >
        <p className="font-sans text-lg font-bold text-neutral-800 dark:text-neutral-200">
          Thanks for reaching out!
        </p>
        <p className="font-sans text-neutral-600 dark:text-neutral-300">
          We&apos;ve got your details and someone from the team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form id="lead-form" onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-8">
      <label className="flex flex-col gap-[7px]">
        <span className="font-sans text-neutral-600 dark:text-neutral-200">Full name</span>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Full name"
          className="h-12 w-full rounded-md border border-neutral-600 bg-white p-3 font-sans text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-primary-400 dark:bg-neutral-800 dark:text-neutral-200"
        />
        {errors.fullName && <span className="text-sm text-red-600">{errors.fullName.message}</span>}
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className="font-sans text-neutral-600 dark:text-neutral-200">Email address</span>
        <input
          {...register("email")}
          type="email"
          placeholder="Email address"
          className="h-12 w-full rounded-md border border-neutral-600 bg-white p-3 font-sans text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-primary-400 dark:bg-neutral-800 dark:text-neutral-200"
        />
        {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
      </label>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5">
          <Checkbox {...register("consent")} />
          <span className="font-sans text-neutral-600 dark:text-neutral-200">
            I consent to my details being processed in line with the{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent && <span className="text-sm text-red-600">{errors.consent.message}</span>}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <Button type="submit" variant="primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Booking…" : "Book your demo"}
          </Button>
          <Button type="submit" variant="outline" disabled={status === "submitting"}>
            Start a free trial
          </Button>
        </div>
        <p className="w-full max-w-[430px] font-sans text-neutral-400">
          Free 14-day trial. Cancel anytime.
        </p>
      </div>
    </form>
  );
}
