'use client';

import { useEffect, useState } from 'react';

type Produto = { id:number; nome:string; preco:number };
type Venda = { id:number; dataVenda:string; quantidade:number; valorTotal:number; produto:{nome:string} };

export default function VendasPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [produtoId, setProdutoId] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  const load = async ()=>{
    const [p,v] = await Promise.all([fetch('/api/admin/products').then(r=>r.json()), fetch('/api/admin/sales').then(r=>r.json())]);
    setProdutos(p); setVendas(v);
  };
  useEffect(()=>{load();},[]);

  async function registrar(){
    await fetch('/api/admin/sales', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({produtoId, quantidade})});
    load();
  }

  const total = vendas.reduce((acc,v)=>acc+v.valorTotal,0);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Controle de vendas</h1>
      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <div className="grid gap-2 md:grid-cols-3">
          <select onChange={(e)=>setProdutoId(Number(e.target.value))} className="rounded-xl border p-2"><option>Produto</option>{produtos.map((p)=><option key={p.id} value={p.id}>{p.nome}</option>)}</select>
          <input type="number" value={quantidade} onChange={(e)=>setQuantidade(Number(e.target.value))} className="rounded-xl border p-2" />
          <button onClick={registrar} className="rounded-full bg-rose-300 px-4 py-2 text-white">Registrar venda</button>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <p className="mb-2 font-medium">Total vendido: R$ {total.toFixed(2)}</p>
        <table className="w-full text-sm"><thead><tr className="text-left"><th>Data</th><th>Produto</th><th>Qtd</th><th>Total</th></tr></thead><tbody>{vendas.map((v)=><tr key={v.id} className="border-t"><td>{new Date(v.dataVenda).toLocaleDateString('pt-BR')}</td><td>{v.produto.nome}</td><td>{v.quantidade}</td><td>R$ {v.valorTotal.toFixed(2)}</td></tr>)}</tbody></table>
      </div>
    </section>
  );
}
