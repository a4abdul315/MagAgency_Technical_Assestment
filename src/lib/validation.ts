import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
  consent: z.literal(true, {
    error: "You must consent to your details being processed",
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
  date: z.string().trim().min(1, "Please select a date"),
  time: z.string().trim().min(1, "Please select a time"),
  notes: z.string().trim().max(2000, "Call notes must be under 2000 characters").optional(),
  companyName: z.string().trim().optional(),
  consent: z.literal(true, {
    error: "You must consent to your details being processed",
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;
