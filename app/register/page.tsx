import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const dynamic = "force-dynamic"; 
// Не даём Next.js пытаться пререндерить searchParams

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Suspense fallback={<div>Loading registration…</div>}>
        <RegisterClient />
      </Suspense>
    </main>
  );
}
