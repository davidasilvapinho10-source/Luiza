import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@bazardaluiza.com';
  const senha = process.env.ADMIN_PASSWORD || '12345678';
  const hash = await bcrypt.hash(senha, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { senhaHash: hash },
    create: { nome: 'Luiza', email, senhaHash: hash }
  });

  if ((await prisma.produto.count()) === 0) {
    const p = await prisma.produto.create({
      data: {
        nome: 'Vestido Floral Rosé',
        descricao: 'Vestido fluido com estampa floral e acabamento delicado.',
        categoria: 'Vestidos',
        cor: 'Rosé',
        preco: 189.9,
        imagemPrincipal: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
        imagensJson: JSON.stringify([
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b'
        ]),
        disponivel: true,
        estoque: 12
      }
    });

    await prisma.produtoTamanho.createMany({
      data: ['P', 'M', 'G'].map((tamanho) => ({ produtoId: p.id, tamanho }))
    });
  }
}

main().finally(() => prisma.$disconnect());
