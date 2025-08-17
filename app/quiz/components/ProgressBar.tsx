"use client";
export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-white/70" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-white/60 text-sm">{pct}%</p>
    </div>
  );
} 