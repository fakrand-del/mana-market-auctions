import { useEffect, useMemo, useState } from "react";

interface CountdownProps {
  endsAt: string | number | Date;
}

const pad = (n: number) => n.toString().padStart(2, "0");

export const Countdown = ({ endsAt }: CountdownProps) => {
  const target = useMemo(() => new Date(endsAt).getTime(), [endsAt]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hrs = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  return (
    <div className="font-mono text-sm text-muted-foreground">
      {days > 0 && <span>{pad(days)}d </span>}
      <span>{pad(hrs)}:{pad(mins)}:{pad(secs)}</span>
    </div>
  );
};
