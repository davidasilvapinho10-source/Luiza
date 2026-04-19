import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const produto = await prisma.produto.findUnique({ where: { id: Number(params.id) }, include: { tamanhos: true } });
  if (!produto) return notFound();
  const imagens = produto.imagensJson ? JSON.parse(produto.imagensJson) : [produto.imagemPrincipal];
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
  const text = encodeURIComponent(`Olá! Gostaria de saber mais sobre ${produto.nome}.`);

  return (
    <main className="container-luiza py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">{imagens.map((img: string) => <Image key={img} src={img} alt={produto.nome} width={900} height={900} className="rounded-2xl" />)}</div>
        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-semibold">{produto.nome}</h1>
          <p className="text-gray-600">{produto.descricao}</p>
          <p><strong>Categoria:</strong> {produto.categoria}</p>
          <p><strong>Cor:</strong> {produto.cor}</p>
          <p><strong>Tamanhos:</strong> {produto.tamanhos.map((t) => t.tamanho).join(', ')}</p>
          <p><strong>Estoque:</strong> {produto.estoque}</p>
          <p className={produto.disponivel ? 'text-green-600' : 'text-red-500'}>{produto.disponivel ? 'Disponível' : 'Indisponível'}</p>
          <p className="text-2xl font-semibold text-rose-500">R$ {produto.preco.toFixed(2)}</p>
          <a href={`https://wa.me/${whatsapp}?text=${text}`} className="inline-flex rounded-full bg-rose-300 px-5 py-3 text-white">Falar no WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
