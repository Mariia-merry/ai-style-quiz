'use client';

import { useRouter } from "next/navigation";

export default function DonePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Готово! 🎉</h1>
        <p className="text-gray-600 mb-6">
          Спасибо за регистрацию! Ваш персональный стилист уже готовит подборку под ваши предпочтения.
        </p>
        <button className="btn" onClick={() => router.push('/')}>Вернуться на главную</button>
      </div>
    </div>
  );
}
