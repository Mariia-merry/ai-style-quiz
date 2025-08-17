"use client";
export default function QuizStepper({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-6 rounded-full ${i <= current ? "bg-white" : "bg-white/20"}`}
          aria-label={`Шаг ${i + 1}`}
        />
      ))}
    </div>
  );
} 