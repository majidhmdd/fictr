"use client";

import { useEffect, useMemo, useState } from "react";

function getTimeParts(target: Date) {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ date, className = "" }: { date: string | Date; className?: string }) {
  const target = useMemo(() => (typeof date === "string" ? new Date(date) : date), [date]);
  const [parts, setParts] = useState(() => getTimeParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getTimeParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className={`inline-flex items-center gap-3 text-sm ${className}`}>
      <TimeBox label="Days" value={parts.days} />
      <TimeBox label="Hrs" value={parts.hours} />
      <TimeBox label="Min" value={parts.minutes} />
      <TimeBox label="Sec" value={parts.seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="px-2 py-1 rounded-md border bg-card font-mono tabular-nums text-base">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}