import { prisma } from '@/lib/prisma';
import { getSessionAdminId } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ produtoId: z.number().int(), quantidade: z.number().int().positive() });

export async function GET() {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });
  const data = await prisma.venda.findMany({ include: { produto: true }, orderBy: { dataVenda: 'desc' } });
  return Response.json(data);
}

export async function POST(req: Request) {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  const produto = await prisma.produto.findUnique({ where: { id: parsed.data.produtoId } });
  if (!produto) return Response.json({ error: 'Produto não encontrado' }, { status: 404 });

  const qtd = Math.min(parsed.data.quantidade, produto.estoque);
  const venda = await prisma.venda.create({ data: { produtoId: produto.id, quantidade: qtd, valorTotal: qtd * produto.preco } });
  const novoEstoque = Math.max(0, produto.estoque - qtd);
  await prisma.produto.update({ where: { id: produto.id }, data: { estoque: novoEstoque, disponivel: novoEstoque === 0 ? false : produto.disponivel } });
  await prisma.estoqueHistorico.create({ data: { produtoId: produto.id, tipoMovimentacao: 'saida', quantidade: qtd, observacao: 'Venda manual' } });
  return Response.json(venda, { status: 201 });
}
