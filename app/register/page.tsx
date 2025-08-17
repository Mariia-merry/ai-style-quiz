"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import UILayout from "../(components shared)/UILayout";
import UIHeader from "../(components shared)/UIHeader";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type FormData = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const sp = useSearchParams();
  const defaultStyle = sp.get("style") || "minimal";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", style: defaultStyle }
  });
  const [ok, setOk] = useState(false);

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setOk(res.ok);
  };

  return (
    <UILayout>
      <UIHeader title="Регистрация" subtitle="Оставьте контакты — мы пришлём приглашение в приложение" />
      {ok ? (
        <div className="card p-6 text-center">
          <p className="text-lg">Готово! Проверьте почту.</p>
          <a className="btn mt-4" href="/">На главную</a>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 max-w-xl mx-auto space-y-4">
          <div>
            <label className="label">Имя</label>
            <input className="input mt-1" placeholder="Ваше имя" {...register("name")} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input mt-1" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <input type="hidden" {...register("style")} value={defaultStyle} readOnly />
          <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? "Сохраняем..." : "Отправить"}</button>
        </form>
      )}
    </UILayout>
  );
} 