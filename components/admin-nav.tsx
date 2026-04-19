import Link from 'next/link';

export function AdminNav() {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-soft">
      <h2 className="mb-4 text-lg font-semibold">Painel</h2>
      <nav className="space-y-2 text-sm">
        <Link className="block rounded-lg px-3 py-2 hover:bg-rose-50" href="/admin">Dashboard</Link>
        <Link className="block rounded-lg px-3 py-2 hover:bg-rose-50" href="/admin/produtos">Produtos</Link>
        <Link className="block rounded-lg px-3 py-2 hover:bg-rose-50" href="/admin/estoque">Estoque</Link>
        <Link className="block rounded-lg px-3 py-2 hover:bg-rose-50" href="/admin/vendas">Vendas</Link>
      </nav>
    </aside>
  );
}
