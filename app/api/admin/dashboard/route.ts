import { prisma } from '@/lib/prisma';
import { getSessionAdminId } from '@/lib/auth';
import { subDays } from 'date-fns';

export async function GET() {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });

  const [produtos, vendas, top] = await Promise.all([
    prisma.produto.findMany(),
    prisma.venda.findMany({ where: { dataVenda: { gte: subDays(new Date(), 14) } }, orderBy: { dataVenda: 'asc' } }),
    prisma.venda.groupBy({ by: ['produtoId'], _sum: { quantidade: true }, orderBy: { _sum: { quantidade: 'desc' } }, take: 5 })
  ]);

  const produtosMap = new Map((await prisma.produto.findMany()).map((p) => [p.id, p.nome]));

  const vendasPorDia = vendas.reduce<Record<string, number>>((acc, venda) => {
    const key = new Date(venda.dataVenda).toLocaleDateString('pt-BR');
    acc[key] = (acc[key] || 0) + venda.valorTotal;
    return acc;
  }, {});

  return Response.json({
    totalVendido: vendas.reduce((a, b) => a + b.valorTotal, 0),
    totalProdutos: produtos.length,
    totalEstoque: produtos.reduce((a, b) => a + b.estoque, 0),
    disponiveis: produtos.filter((p) => p.disponivel).length,
    indisponiveis: produtos.filter((p) => !p.disponivel).length,
    topProdutos: top.map((item) => ({ nome: produtosMap.get(item.produtoId) || `#${item.produtoId}`, quantidade: item._sum.quantidade || 0 })),
    vendasPorDia: Object.entries(vendasPorDia).map(([dia, total]) => ({ dia, total }))
  });
}
