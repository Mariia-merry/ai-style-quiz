'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Removed missing UI imports; using native elements

export default function RegisterClient() {
  const router = useRouter();
  const params = useSearchParams();
  const style = params.get('style');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // эмуляция запроса (можно заменить на API вызов)
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // после успешной регистрации отправляем на /done
      router.push('/done');
    } catch (err) {
      setError('Произошла ошибка, попробуйте ещё раз');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow"
    >
      <h1 className="text-2xl font-bold mb-2">Регистрация</h1>
      {style && (
        <p className="text-sm text-gray-500">
          Выбранный стиль: <span className="font-semibold">{style}</span>
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Имя</label>
        <input
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Введите ваше имя"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={loading} className="btn w-full">
        {loading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}


