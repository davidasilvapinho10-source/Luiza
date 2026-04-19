'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Dashboard = {
  totalVendido: number;
  totalProdutos: number;
  totalEstoque: number;
  disponiveis: number;
  indisponiveis: number;
  topProdutos: { nome: string; quantidade: number }[];
  vendasPorDia: { dia: string; total: number }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  useEffect(() => { fetch('/api/admin/dashboard').then((r) => r.json()).then(setData); }, []);
  if (!data) return <p>Carregando...</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{[
        ['Total vendido', `R$ ${data.totalVendido.toFixed(2)}`],
        ['Produtos', data.totalProdutos],
        ['Estoque total', data.totalEstoque],
        ['Disponíveis', data.disponiveis],
        ['Indisponíveis', data.indisponiveis]
      ].map(([k,v]) => <div key={String(k)} className="rounded-2xl bg-white p-4 shadow-soft"><p className="text-xs text-gray-500">{k}</p><p className="text-2xl font-semibold">{v}</p></div>)}</div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <h2 className="mb-3 font-medium">Vendas por período</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={data.vendasPorDia}><XAxis dataKey="dia" /><YAxis /><Tooltip /><Area type="monotone" dataKey="total" stroke="#e7b8c8" fill="#f7d9e3" /></AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <h2 className="mb-3 font-medium">Produtos mais vendidos</h2>
          <ul className="space-y-2 text-sm">{data.topProdutos.map((p)=> <li key={p.nome} className="flex justify-between border-b pb-2"><span>{p.nome}</span><strong>{p.quantidade} un.</strong></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
