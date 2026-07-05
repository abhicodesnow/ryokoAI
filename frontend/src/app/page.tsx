// frontend/src/app/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('Failed to connect to backend.'));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">RyokoAI Dashboard</h1>
      <p className="text-xl text-blue-500">{message}</p>
    </main>
  );
}
