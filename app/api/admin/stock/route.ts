import { prisma } from '@/lib/prisma';
import { getSessionAdminId } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ produtoId: z.number().int(), tipo: z.enum(['entrada', 'saida', 'ajuste']), quantidade: z.number().int(), observacao: z.string().optional() });

export async function POST(req: Request) {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  const { produtoId, tipo, quantidade, observacao } = parsed.data;

  const produto = await prisma.produto.findUnique({ where: { id: produtoId } });
  if (!produto) return Response.json({ error: 'Produto não encontrado' }, { status: 404 });

  let novoEstoque = produto.estoque;
  if (tipo === 'entrada') novoEstoque += quantidade;
  if (tipo === 'saida') novoEstoque = Math.max(0, produto.estoque - quantidade);
  if (tipo === 'ajuste') novoEstoque = Math.max(0, quantidade);

  await prisma.produto.update({ where: { id: produtoId }, data: { estoque: novoEstoque, disponivel: novoEstoque === 0 ? false : produto.disponivel } });
  await prisma.estoqueHistorico.create({ data: { produtoId, tipoMovimentacao: tipo, quantidade, observacao } });
  return Response.json({ success: true });
}
