import UILayout from "../(components shared)/UILayout";
import UIHeader from "../(components shared)/UIHeader";
import CTASection from "../(components shared)/CTASection";
import { STYLE_INFO } from "@/lib/quiz-engine/rules";

export default function ResultPage({ searchParams }: { searchParams: { style?: string } }) {
  const key = (searchParams.style ?? "minimal") as keyof typeof STYLE_INFO;
  const info = STYLE_INFO[key] ?? STYLE_INFO.minimal;

  return (
    <UILayout>
      <UIHeader title={`Ваш стиль: ${info.title}`} subtitle={info.description} />
      <div className="card overflow-hidden">
        {/* eslint-disable @next/next/no-img-element */}
        <img src={info.hero} alt={info.title} className="w-full object-cover aspect-[16/7]" />
      </div>
      <CTASection />
      <div className="mt-6 text-center text-white/60 text-sm">
        Не согласны с результатом? <a className="underline" href="/quiz">Пройти снова</a>
      </div>
    </UILayout>
  );
} 