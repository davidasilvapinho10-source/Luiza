import { prisma } from '@/lib/prisma';
import { getSessionAdminId } from '@/lib/auth';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!getSessionAdminId()) return Response.json({ error: 'Não autorizado' }, { status: 401 });
  await prisma.produto.delete({ where: { id: Number(params.id) } });
  return Response.json({ success: true });
}
