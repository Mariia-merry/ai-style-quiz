"use client";

import { useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

type Price = { from: string; to: string };

export default function ResultBriefClient() {
  const params = useSearchParams();
  const router = useRouter();

  // Можно принять стиль с предыдущего шага (не обязателен)
  const style = useMemo(() => params.get("style") ?? "", [params]);

  // поля формы
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<Price>({ from: "", to: "" });
  const [sizeRu, setSizeRu] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // ошибки
  const [errors, setErrors] = useState<Record<string, string>>({});

  // drag-n-drop
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files?.length) return;
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleFiles = (list: FileList) => {
    const f = list[0];
    if (!f) return;

    // валидация типа/размера
    const okType = ["image/jpeg", "image/png"].includes(f.type);
    const okSize = f.size <= 10 * 1024 * 1024; // 10MB

    const newErr: Record<string, string> = { ...errors };
    delete newErr.image;

    if (!okType) newErr.image = "Допустимы JPG или PNG.";
    else if (!okSize) newErr.image = "Максимум 10MB.";
    else setFile(f);

    setErrors(newErr);
  };

  const prevent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // валидации
  const onlyDigits = (v: string) => v.replace(/\D+/g, "");

  const validate = () => {
    const err: Record<string, string> = {};

    if (!desc.trim()) err.desc = "Опишите, что хотите подобрать.";
    const fromN = Number(price.from);
    const toN = Number(price.to);
    if (!price.from) err.priceFrom = "Укажите цену «от».";
    if (!price.to) err.priceTo = "Укажите цену «до».";
    if (!err.priceFrom && !err.priceTo && fromN > toN) {
      err.priceFrom = "«От» не может быть больше «До».";
      err.priceTo = "«До» не может быть меньше «От».";
    }
    if (!sizeRu) err.sizeRu = "Укажите размер в RU.";
    if (!file) err.image = "Загрузите изображение.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const canSubmit =
    desc.trim().length > 0 &&
    price.from !== "" &&
    price.to !== "" &&
    Number(price.from) <= Number(price.to) &&
    sizeRu !== "" &&
    !!file &&
    !errors.desc &&
    !errors.priceFrom &&
    !errors.priceTo &&
    !errors.sizeRu &&
    !errors.image;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // На этом шаге просто переходим к регистрации.
    // Данные (кроме файла) можно передать в query, файл обычно грузят позже в API/хранилище.
    const q = new URLSearchParams({
      style,
      desc,
      priceFrom: price.from,
      priceTo: price.to,
      sizeRu
    }).toString();

    router.push(`/register?${q}`);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl shadow p-6 sm:p-8 space-y-8"
    >
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Ваш персональный стилист готов к составлению идеального образа.
        </h1>
        {style && (
          <p className="text-sm text-gray-500">
            Предпочтительный стиль: <b>{style}</b>
          </p>
        )}
      </header>

      {/* Описание запроса */}
      <section className="space-y-2">
        <label className="block text-sm font-medium">
          Опишите какую вещь или вещи, хотите подобрать под настроение/событие
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Например: хочу найти белую короткую юбку из льна под светлый летний образ."
          className={clsx(
            "w-full rounded-lg border px-3 py-2 min-h-[120px] focus:outline-none focus:ring",
            errors.desc ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
          )}
        />
        {errors.desc && (
          <p className="text-sm text-red-600">{errors.desc}</p>
        )}
      </section>

      {/* Цена */}
      <section className="space-y-2">
        <label className="block text-sm font-medium">Выберите ценовой диапазон</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-xs text-gray-500 mb-1">От</span>
            <input
              inputMode="numeric"
              pattern="\d*"
              value={price.from}
              onChange={(e) =>
                setPrice((p) => ({ ...p, from: onlyDigits(e.target.value) }))
              }
              className={clsx(
                "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring",
                errors.priceFrom ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
              )}
            />
            {errors.priceFrom && (
              <p className="text-sm text-red-600 mt-1">{errors.priceFrom}</p>
            )}
          </div>
          <div>
            <span className="block text-xs text-gray-500 mb-1">До</span>
            <input
              inputMode="numeric"
              pattern="\d*"
              value={price.to}
              onChange={(e) =>
                setPrice((p) => ({ ...p, to: onlyDigits(e.target.value) }))
              }
              className={clsx(
                "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring",
                errors.priceTo ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
              )}
            />
            {errors.priceTo && (
              <p className="text-sm text-red-600 mt-1">{errors.priceTo}</p>
            )}
          </div>
        </div>
      </section>

      {/* Размер RU */}
      <section className="space-y-2">
        <label className="block text-sm font-medium">Введите свой размер «RU»</label>
        <input
          inputMode="numeric"
          pattern="\d*"
          value={sizeRu}
          onChange={(e) => setSizeRu(onlyDigits(e.target.value))}
          className={clsx(
            "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring",
            errors.sizeRu ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
          )}
          placeholder="Например: 42"
        />
        {errors.sizeRu && (
          <p className="text-sm text-red-600">{errors.sizeRu}</p>
        )}
      </section>

      {/* Загрузка изображения */}
      <section className="space-y-2">
        <label className="block text-sm font-medium">
          Добавьте свое изображение
        </label>

        <div
          onDragEnter={prevent}
          onDragOver={prevent}
          onDrop={onDrop}
          className={clsx(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer",
            errors.image ? "border-red-500 bg-red-50" : "border-gray-300 hover:bg-gray-50"
          )}
          onClick={() => document.getElementById("image-input")?.click()}
        >
          <p className="text-sm text-gray-600">
            Перетащите файл сюда или нажмите, чтобы выбрать (JPG/PNG, до 10MB)
          </p>
          {file && (
            <p className="mt-2 text-sm">
              Выбран файл: <b>{file.name}</b> — {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          )}
        </div>

        <input
          id="image-input"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        {errors.image && (
          <p className="text-sm text-red-600">{errors.image}</p>
        )}
      </section>

      {/* CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className={clsx(
            "w-full rounded-lg px-5 py-3 font-medium",
            canSubmit
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          )}
        >
          Подобрать образ
        </button>
      </div>
    </form>
  );
}

