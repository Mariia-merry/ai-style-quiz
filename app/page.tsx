export default function Page() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Найди свой стиль с AI</h1>
        <p className="mt-4 text-white/70">Ответь на 3 вопроса — получи персональный стиль и начни шопить умнее.</p>
        <div className="mt-8">
          <a className="btn text-lg" href="/quiz">Пройти квиз</a>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold">Картинки-вопросы</h3>
          <p className="text-white/70 text-sm mt-2">Выбирай визуально, без лишних слов.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Моментальный результат</h3>
          <p className="text-white/70 text-sm mt-2">AI суммирует предпочтения и называет стиль.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Регистрация</h3>
          <p className="text-white/70 text-sm mt-2">Оставь имя и email — продолжим в приложении.</p>
        </div>
    </div>
    </section>
  );
}
