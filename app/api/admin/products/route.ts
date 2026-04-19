import { prisma } from '@/lib/prisma';
import { getSessionAdminId } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  nome: z.string().min(1),
  descricao: z.string().min(1),
  categoria: z.string().min(1),
  cor: z.string().min(1),
  preco: z.number().nonnegative(),
  imagemPrincipal: z.string().url(),
  disponivel: z.boolean(),
  estoque: z.number().int(),
  tamanhos: z.array(z.string()).default([])
});

export async function GET() {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });
  const data = await prisma.produto.findMany({ include: { tamanhos: true }, orderBy: { updatedAt: 'desc' } });
  return Response.json(data.map((p) => ({ ...p, tamanhos: p.tamanhos.map((t) => t.tamanho) })));
}

export async function POST(req: Request) {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  const payload = parsed.data;
  const estoqueFinal = Math.max(payload.estoque, 0);
  const produto = await prisma.produto.create({
    data: {
      ...payload,
      disponivel: estoqueFinal === 0 ? false : payload.disponivel,
      estoque: estoqueFinal,
      tamanhos: { createMany: { data: payload.tamanhos.map((t) => ({ tamanho: t })) } }
    }
  });
  return Response.json(produto, { status: 201 });
}
