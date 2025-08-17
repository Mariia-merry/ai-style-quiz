"use client";

import UILayout from "../(components shared)/UILayout";
import UIHeader from "../(components shared)/UIHeader";
import ProgressBar from "./components/ProgressBar";
import QuizStepper from "./components/QuizStepper";
import QuestionCard from "./components/QuestionCard";
import quiz from "@/data/quiz.json";
import { useMemo, useState } from "react";
import { computeStyle } from "@/lib/quiz-engine/scorer";
import type { QuizData } from "@/lib/quiz-engine/types";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const data = quiz as unknown as QuizData;
  const total = data.questions.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const canNext = !!answers[data.questions[step].id];
  const done = useMemo(() => Object.keys(answers).length === total, [answers, total]);

  function next() {
    if (step < total - 1) setStep(s => s + 1);
    else {
      const style = computeStyle(answers, data);
      router.push(`/result?style=${style}`);
    }
  }
  function prev() { if (step > 0) setStep(s => s - 1); }

  return (
    <UILayout>
      <UIHeader title="Пройди квиз" subtitle={data.title} />
      <div className="mb-6 flex items-center justify-between">
        <ProgressBar current={step} total={total} />
        <QuizStepper current={step} total={total} />
      </div>

      <QuestionCard
        q={data.questions[step]}
        value={answers[data.questions[step].id]}
        onChange={(optId) => setAnswers(a => ({ ...a, [data.questions[step].id]: optId }))}
      />

      <div className="mt-6 flex items-center justify-between">
        <button className="btn" onClick={prev} disabled={step === 0}>Назад</button>
        <button className="btn" onClick={next} disabled={!canNext}>
          {step === total - 1 ? "Завершить" : "Далее"}
        </button>
      </div>

      <p className="mt-3 text-center text-white/50 text-sm">
        Ответов: {Object.keys(answers).length}/{total} {done ? "— готово!" : ""}
      </p>
    </UILayout>
  );
} 