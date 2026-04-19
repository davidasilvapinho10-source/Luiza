import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession, setSessionCookie } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), senha: z.string().min(6) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: 'Dados inválidos' }, { status: 400 });

  const admin = await prisma.admin.findUnique({ where: { email: parsed.data.email } });
  if (!admin) return Response.json({ error: 'Inválido' }, { status: 401 });
  const ok = await bcrypt.compare(parsed.data.senha, admin.senhaHash);
  if (!ok) return Response.json({ error: 'Inválido' }, { status: 401 });

  setSessionCookie(createSession(admin.id));
  return Response.json({ success: true });
}
