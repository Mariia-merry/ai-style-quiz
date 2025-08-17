import type { StyleKey } from "./types";

export const STYLE_INFO: Record<StyleKey, { title: string; description: string; hero: string }> = {
  minimal: {
    title: "Minimal & Clean",
    description: "Чистые линии, нейтральные тона, функциональность без лишнего.",
    hero: "/images/minimal-hero.webp"
  },
  bold: {
    title: "Bold & Expressive",
    description: "Яркие цвета, контраст и смелые акценты — ты любишь выделяться.",
    hero: "/images/bold-hero.webp"
  },
  cozy: {
    title: "Cozy & Warm",
    description: "Тактильные материалы, комфорт и мягкие палитры — про уют и тепло.",
    hero: "/images/cozy-hero.webp"
  }
}; 