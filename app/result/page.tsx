import { Suspense } from "react";
import ResultBriefClient from "./ResultBriefClient.tsx";

export const dynamic = "force-dynamic";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Suspense fallback={<div className="text-gray-600">Загрузка…</div>}>
          <ResultBriefClient />
        </Suspense>
      </div>
    </main>
  );
}
