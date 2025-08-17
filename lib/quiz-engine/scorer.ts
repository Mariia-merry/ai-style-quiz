import type { QuizData, StyleKey } from "./types";

export function computeStyle(
  answers: Record<string, string>,
  quiz: QuizData
): StyleKey {
  const totals: Record<StyleKey, number> = { minimal: 0, bold: 0, cozy: 0 };
  for (const q of quiz.questions) {
    const a = answers[q.id];
    const opt = q.options.find(o => o.id === a);
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.scores)) {
      totals[k as StyleKey] += v ?? 0;
    }
  }
  const top = (Object.entries(totals) as [StyleKey, number][])  
    .sort((a, b) => b[1] - a[1])[0]?.[0];
  return top ?? "minimal";
} 