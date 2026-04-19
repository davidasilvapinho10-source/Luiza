import Image from 'next/image';
import Link from 'next/link';
import type { PublicProduct } from '@/lib/types';

export function ProductCard({ product }: { product: PublicProduct }) {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
  const text = encodeURIComponent(`Olá! Quero pedir o produto ${product.nome}.`);
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-soft">
      <Image src={product.imagemPrincipal} alt={product.nome} width={480} height={480} className="h-64 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{product.nome}</h3>
          <span className="text-rose-500">R$ {product.preco.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500">{product.categoria} • {product.cor}</p>
        <p className="text-xs text-gray-500">Tamanhos: {product.tamanhos.join(', ') || '—'}</p>
        <p className={`text-xs font-medium ${product.disponivel ? 'text-green-600' : 'text-red-500'}`}>
          {product.disponivel ? 'Disponível' : 'Indisponível'}
        </p>
        <div className="flex gap-2 pt-1">
          <Link href={`/catalogo/${product.id}`} className="rounded-full border border-gray-200 px-4 py-2 text-xs hover:bg-gray-50">Detalhes</Link>
          <a href={`https://wa.me/${whatsapp}?text=${text}`} className="rounded-full bg-rose-300 px-4 py-2 text-xs text-white hover:bg-rose-400">Pedir pelo WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
