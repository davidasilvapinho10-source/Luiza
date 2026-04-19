'use client';

import { useEffect, useState } from 'react';

type P = { id:number; nome:string; estoque:number; disponivel:boolean };

export default function EstoquePage() {
  const [list, setList] = useState<P[]>([]);
  const [produtoId, setProdutoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState(1);
  const [tipo, setTipo] = useState('entrada');
  const load = ()=> fetch('/api/admin/products').then(r=>r.json()).then(setList);
  useEffect(load,[]);

  async function mov() {
    await fetch('/api/admin/stock', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ produtoId, tipo, quantidade, observacao:'Ajuste manual' }) });
    load();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Controle de estoque</h1>
      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <div className="grid gap-2 md:grid-cols-4">
          <select onChange={(e)=>setProdutoId(Number(e.target.value))} className="rounded-xl border p-2"><option>Produto</option>{list.map((p)=><option key={p.id} value={p.id}>{p.nome}</option>)}</select>
          <select value={tipo} onChange={(e)=>setTipo(e.target.value)} className="rounded-xl border p-2"><option value="entrada">Aumentar</option><option value="saida">Diminuir</option><option value="ajuste">Quantidade exata</option></select>
          <input type="number" value={quantidade} onChange={(e)=>setQuantidade(Number(e.target.value))} className="rounded-xl border p-2" />
          <button onClick={mov} className="rounded-full bg-rose-300 px-4 py-2 text-white">Aplicar</button>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <h2 className="mb-2 font-medium">Produtos com estoque baixo (≤ 3)</h2>
        <ul>{list.filter((p)=>p.estoque<=3).map((p)=><li key={p.id} className="border-t py-2 text-sm">{p.nome}: {p.estoque}</li>)}</ul>
      </div>
    </section>
  );
}
