"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ScheduleCallContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ScheduleCallContext = createContext<ScheduleCallContextValue | null>(null);

export function ScheduleCallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <ScheduleCallContext.Provider value={value}>{children}</ScheduleCallContext.Provider>;
}

export function useScheduleCall() {
  const ctx = useContext(ScheduleCallContext);
  if (!ctx) {
    throw new Error("useScheduleCall must be used within a ScheduleCallProvider");
  }
  return ctx;
}
