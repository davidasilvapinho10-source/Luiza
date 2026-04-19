import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.produto.findMany({ include: { tamanhos: true }, orderBy: { updatedAt: 'desc' } });
  return Response.json(data.map((p) => ({ ...p, tamanhos: p.tamanhos.map((t) => t.tamanho) })));
}
