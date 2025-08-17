"use client";

import { useSearchParams } from "next/navigation";

export default function RegisterClient() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") ?? "none";

  return (
    <div className="p-8 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Registration</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Referral code: <span className="font-mono">{refCode}</span>
      </p>
    </div>
  );
}

