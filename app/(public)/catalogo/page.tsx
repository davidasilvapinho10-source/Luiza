'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '@/components/product-card';
import type { PublicProduct } from '@/lib/types';

export default function CatalogoPage() {
  const [items, setItems] = useState<PublicProduct[]>([]);
  const [q, setQ] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [disponivel, setDisponivel] = useState('');
  const [ordem, setOrdem] = useState('nome');

  useEffect(() => {
    fetch('/api/public/products').then((r) => r.json()).then(setItems);
  }, []);

  const categorias = [...new Set(items.map((i) => i.categoria))];

  const filtered = useMemo(() => {
    let list = items.filter((p) => p.nome.toLowerCase().includes(q.toLowerCase()));
    if (categoria) list = list.filter((p) => p.categoria === categoria);
    if (tamanho) list = list.filter((p) => p.tamanhos.includes(tamanho));
    if (disponivel) list = list.filter((p) => String(p.disponivel) === disponivel);
    list = list.sort((a, b) => (ordem === 'preco' ? a.preco - b.preco : a.nome.localeCompare(b.nome)));
    return list;
  }, [items, q, categoria, tamanho, disponivel, ordem]);

  return (
    <main className="container-luiza py-10">
      <h1 className="mb-6 text-3xl font-semibold">Catálogo</h1>
      <div className="mb-6 grid gap-3 rounded-2xl bg-white p-4 shadow-soft md:grid-cols-5">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome" className="rounded-xl border p-2" />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="rounded-xl border p-2"><option value="">Categoria</option>{categorias.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} className="rounded-xl border p-2"><option value="">Tamanho</option>{['PP','P','M','G','GG'].map((t)=><option key={t}>{t}</option>)}</select>
        <select value={disponivel} onChange={(e) => setDisponivel(e.target.value)} className="rounded-xl border p-2"><option value="">Disponibilidade</option><option value="true">Disponível</option><option value="false">Indisponível</option></select>
        <select value={ordem} onChange={(e) => setOrdem(e.target.value)} className="rounded-xl border p-2"><option value="nome">Ordem: Nome</option><option value="preco">Ordem: Preço</option></select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
