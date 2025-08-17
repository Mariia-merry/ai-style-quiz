"use client";
import Image from "next/image";
import { useId } from "react";
import type { QuizQuestion } from "@/lib/quiz-engine/types";

export default function QuestionCard({
  q,
  value,
  onChange
}: {
  q: QuizQuestion;
  value?: string;
  onChange: (optionId: string) => void;
}) {
  const gid = useId();
  return (
    <div className="card p-5">
      <h3 className="text-xl font-semibold mb-4">{q.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {q.options.map(opt => (
          <label key={opt.id} className={`block rounded-2xl border border-white/10 overflow-hidden hover:border-white/30 ${value === opt.id ? "ring-2 ring-white/60" : ""}`}>
            <div className="relative aspect-[4/3] bg-black/30">
              <Image src={opt.image} alt={opt.label} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between p-3">
              <div className="text-sm">{opt.label}</div>
              <input
                type="radio"
                name={gid}
                className="h-4 w-4"
                checked={value === opt.id}
                onChange={() => onChange(opt.id)}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
} 