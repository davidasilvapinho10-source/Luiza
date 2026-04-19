'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@bazardaluiza.com');
  const [senha, setSenha] = useState('12345678');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    if (!res.ok) return setErro('Credenciais inválidas');
    router.push('/admin');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-nude px-4">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-soft">
        <h1 className="text-center text-2xl font-semibold">Login Administrativo</h1>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-xl border p-3" />
        <input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} className="w-full rounded-xl border p-3" />
        {erro && <p className="text-sm text-red-500">{erro}</p>}
        <button className="w-full rounded-full bg-rose-300 px-4 py-3 text-white">Entrar</button>
      </form>
    </main>
  );
}
