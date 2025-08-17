import { ANSWER_WEIGHTS, STYLE_TITLES, STYLE_DESCRIPTIONS, StyleKey } from './rules';

export type AnswersMap = Record<string, string>; // questionId -> optionId

export function scoreStyle(answers: AnswersMap) {
  // Берём перечень стилей из справочника, чтобы не забыть новые ключи
  const allStyles = Object.keys(STYLE_TITLES) as StyleKey[];

  // Инициализируем нулями все стили, включая minimal и glam
  const scores = Object.fromEntries(allStyles.map(k => [k, 0])) as Record<StyleKey, number>;

  Object.entries(answers).forEach(([q, opt]) => {
    const key = `${q}.${opt}`;
    const weights = ANSWER_WEIGHTS[key];
    if (!weights) return;
    for (const [style, delta] of Object.entries(weights)) {
      if (style in scores && typeof delta === 'number') {
        scores[style as StyleKey] += delta;
      }
    }
  });

  const winner = allStyles.reduce((acc, k) => (scores[k] > scores[acc] ? k : acc), allStyles[0]);

  return {
    winner,
    title: STYLE_TITLES[winner],
    description: STYLE_DESCRIPTIONS[winner],
    scores
  };
}
