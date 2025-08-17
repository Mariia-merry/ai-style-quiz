"use client";

import { useState } from 'react';

export default function TryOnPage() {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [dressPhoto, setDressPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setUserPhoto(f);
  };

  const handleDressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setDressPhoto(f);
  };

  const tryOn = async () => {
    setError('');
    if (!userPhoto || !dressPhoto) {
      setError('Please select both photos.');
      return;
    }
    const formData = new FormData();
    formData.append('user_photo', userPhoto);
    formData.append('dress_photo', dressPhoto);
    try {
      const res = await fetch('https://api.meshcapade.com/v1/try-on', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`API Request Failed: ${res.status} ${res.statusText}`);
      // handle successful response
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">Virtual Dress Try-On</h1>

      <div className="border-2 border-dashed border-gray-300 rounded p-6 mb-6 text-center">
        <h2 className="font-semibold mb-2">Upload Your Photo</h2>
        <input type="file" accept="image/*" onChange={handleUserChange} />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded p-6 mb-6 text-center">
        <h2 className="font-semibold mb-2">Upload Dress Photo</h2>
        <input type="file" accept="image/*" onChange={handleDressChange} />
      </div>

      <button className="btn" onClick={tryOn}>Try On Dress</button>

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  );
} 