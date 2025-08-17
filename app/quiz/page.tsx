'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import UILayout from '../(components shared)/UILayout';
import UIHeader from '../(components shared)/UIHeader';
import ProgressBar from './components/ProgressBar';
import QuizStepper from './components/QuizStepper';
import QuestionCard from './components/QuestionCard';

import { scoreStyle } from '@/lib/quiz-engine/scorer';
// 👇 используем общий тип, который ожидает QuestionCard
import type { QuizQuestion, QuizOption } from '@/lib/quiz-engine/types';

type RawOption = QuizOption;    // теперь RawOption включает и image, и scores
type RawQuestion = { id: string; title: string; options: RawOption[]; type?: string };
type RawQuizData = { title: string; questions: RawQuestion[] };

export default function QuizPage() {
  const router = useRouter();
  const [raw, setRaw] = useState<RawQuizData | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/quiz-data', { cache: 'no-store' });
      const json = (await res.json()) as RawQuizData;
      setRaw(json);
    })();
  }, []);

  // Нормализуем: гарантируем type: "single" для совместимости с QuizQuestion
  const data = useMemo(() => {
    if (!raw) return null;
    const questions: QuizQuestion[] = raw.questions.map(q => ({
      id:    q.id,
      title: q.title,
      type:  (q.type as QuizQuestion['type']) ?? 'single',
      options: q.options as unknown as QuizOption[]
    }));
    return { title: raw.title, questions };
  }, [raw]);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = data?.questions.length ?? 0;
  const currentQ = data?.questions[step];
  const canNext = !!(currentQ && answers[currentQ.id]);
  const done = useMemo(
    () => (data ? Object.keys(answers).length === data.questions.length : false),
    [answers, data]
  );

  function next() {
    if (!data || !currentQ) return;
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      const { winner } = scoreStyle(answers);
      router.push(`/result?a=${encodeURIComponent(JSON.stringify(answers))}&style=${winner}`);
    }
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  if (!data) {
    return (
      <UILayout>
        <UIHeader title="Пройди квиз" subtitle="Загружаем вопросы…" />
      </UILayout>
    );
  }

  return (
    <UILayout>
      <UIHeader title="Пройди квиз" subtitle={data.title} />

      <div className="mb-6 flex items-center justify-between">
        <ProgressBar current={step} total={total} />
        <QuizStepper current={step} total={total} />
      </div>

      {currentQ && (
        <QuestionCard
          q={currentQ} // ← теперь это QuizQuestion с type
          value={answers[currentQ.id]}
          onChange={(optId) =>
            setAnswers((a) => ({ ...a, [currentQ.id]: optId }))
          }
        />
      )}

      <div className="mt-6 flex items-center justify-between">
        <button className="btn" onClick={prev} disabled={step === 0}>
          Назад
        </button>
        <button className="btn" onClick={next} disabled={!canNext}>
          {step === total - 1 ? 'Завершить' : 'Далее'}
        </button>
      </div>

      <p className="mt-3 text-center text-white/50 text-sm">
        Ответов: {Object.keys(answers).length}/{total} {done ? '— готово!' : ''}
      </p>
    </UILayout>
  );
}
