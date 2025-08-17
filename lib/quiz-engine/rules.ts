export type StyleKey =
  | 'classic'
  | 'casual'
  | 'sport'
  | 'romantic'
  | 'boho'
  | 'street'
  | 'minimal'
  | 'glam';

export const STYLE_TITLES: Record<StyleKey, string> = {
  classic: 'Классический',
  casual: 'Кэжуал',
  sport: 'Спортивный',
  romantic: 'Романтичный',
  boho: 'Бохо',
  street: 'Уличный',
  minimal: 'Минимализм',
  glam: 'Гламур'
};

export const STYLE_DESCRIPTIONS: Record<StyleKey, string> = {
  classic: 'Чёткие линии, базовые цвета, качественные материалы и вневременные силуэты.',
  casual: 'Комфорт на первом месте: деним, свитшоты, футболки, кроссовки.',
  sport: 'Athleisure и оверсайз, лаконичные формы, функциональность.',
  romantic: 'Мягкие ткани, пастельные тона, оборки/кружево, цветочные мотивы.',
  boho: 'Свобода силуэта, этно-узоры, многослойность, природная палитра.',
  street: 'Смелые сочетания, яркие акценты, принты и индивидуальность.',
  minimal: 'Чистые линии, однотонные вещи, нейтральные оттенки, максимум функциональности и минимум деталей.',
  glam: 'Блеск, яркие ткани, вечерние образы, драматичность и акцент на эффектность.'
};

// вопрос.опция -> прибавки к стилям
export const ANSWER_WEIGHTS: Record<string, Partial<Record<StyleKey, number>>> = {
  // 1) базовый стиль
  'style_base.classic':  { classic: 3 },
  'style_base.casual':   { casual: 3 },
  'style_base.sport':    { sport: 3 },
  'style_base.romantic': { romantic: 3 },
  'style_base.boho':     { boho: 3 },
  'style_base.street':   { street: 3 },
  'style_base.minimal':  { minimal: 3 },
  'style_base.glam':     { glam: 3 },

  // 2) палитра
  'palette.neutral': { classic: 2, casual: 1, minimal: 2 },
  'palette.pastel':  { romantic: 2, classic: 1 },
  'palette.bright':  { street: 2, sport: 1, glam: 2 },
  'palette.dark':    { classic: 2, street: 1 },
  'palette.earthy':  { boho: 2, casual: 1 },

  // 3) крой
  'fit.slim':     { classic: 2, romantic: 1, glam: 1 },
  'fit.oversize': { sport: 2, street: 1, boho: 1 },
  'fit.regular':  { casual: 2, classic: 1, minimal: 1 },
  'fit.mix':      { street: 1, casual: 1, classic: 1 },

  // 4) принты
  'prints.solid':    { classic: 2, minimal: 2 },
  'prints.geometry': { classic: 1, casual: 1, street: 1, minimal: 1 },
  'prints.floral':   { romantic: 2, boho: 1 },
  'prints.animal':   { street: 2, boho: 1, glam: 1 },
  'prints.abstract': { street: 2 },

  // 5) вдохновение
  'mood.minimal': { minimal: 3, classic: 1 },
  'mood.glam':    { glam: 3, romantic: 1 },
  'mood.cozy':    { casual: 2, boho: 1 },
  'mood.bold':    { street: 2, sport: 1 },
  'mood.biz':     { classic: 2 }
};

