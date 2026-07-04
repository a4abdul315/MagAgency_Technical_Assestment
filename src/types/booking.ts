export type Booking = {
  id: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  companyName: string;
  consent: boolean;
  createdAt: string;
};

export type BookingSummary = Pick<Booking, "id" | "date" | "time">;

export type Lead = {
  id: string;
  fullName: string;
  email: string;
  consent: boolean;
  createdAt: string;
};
