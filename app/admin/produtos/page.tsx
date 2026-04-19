'use client';

import { useEffect, useState } from 'react';

type Produto = {
  id: number; nome: string; categoria: string; cor: string; preco: number; estoque: number; disponivel: boolean; descricao: string; imagemPrincipal: string; tamanhos: string[];
};

const empty = { nome:'', categoria:'', cor:'', preco:0, estoque:0, disponivel:true, descricao:'', imagemPrincipal:'', tamanhos:'P,M,G' };

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState<any>(empty);

  const load = () => fetch('/api/admin/products').then(r=>r.json()).then(setProdutos);
  useEffect(load, []);

  async function save() {
    await fetch('/api/admin/products', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, tamanhos: form.tamanhos.split(',').map((t:string)=>t.trim()) }) });
    setForm(empty); load();
  }
  async function remove(id:number){ await fetch(`/api/admin/products/${id}`, {method:'DELETE'}); load(); }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Gerenciar produtos</h1>
      <div className="grid gap-2 rounded-2xl bg-white p-4 shadow-soft md:grid-cols-2">
        {['nome','categoria','cor','imagemPrincipal','descricao','tamanhos'].map((k)=><input key={k} value={form[k]} onChange={(e)=>setForm({...form,[k]:e.target.value})} placeholder={k} className="rounded-xl border p-2" />)}
        <input type="number" value={form.preco} onChange={(e)=>setForm({...form,preco:Number(e.target.value)})} placeholder="preço" className="rounded-xl border p-2" />
        <input type="number" value={form.estoque} onChange={(e)=>setForm({...form,estoque:Number(e.target.value)})} placeholder="estoque" className="rounded-xl border p-2" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.disponivel} onChange={(e)=>setForm({...form,disponivel:e.target.checked})}/> Disponível</label>
        <button onClick={save} className="rounded-full bg-rose-300 px-4 py-2 text-white">Cadastrar produto</button>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <table className="w-full text-sm"><thead><tr className="text-left"><th>Produto</th><th>Preço</th><th>Estoque</th><th>Status</th><th /></tr></thead>
          <tbody>{produtos.map((p)=><tr key={p.id} className="border-t"><td>{p.nome}</td><td>R$ {p.preco.toFixed(2)}</td><td>{p.estoque}</td><td>{p.disponivel?'Disponível':'Indisponível'}</td><td><button className="text-red-500" onClick={()=>remove(p.id)}>Remover</button></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
