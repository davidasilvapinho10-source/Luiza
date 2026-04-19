# Bazar da Luiza

Sistema web completo para vitrine pública e gestão administrativa (produtos, estoque, vendas e dashboard) usando Next.js + Tailwind + Prisma/SQLite.

## Como rodar

1. Copie variáveis:
   ```bash
   cp .env.example .env
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Gere cliente Prisma e rode migração:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Popule com admin padrão e produto inicial:
   ```bash
   npm run db:seed
   ```
5. Suba o projeto:
   ```bash
   npm run dev
   ```

## Credencial inicial

- Email: `admin@bazardaluiza.com`
- Senha: `12345678`

## Funcionalidades

- Área pública com Home, Catálogo com filtros e busca, detalhes do produto, Sobre e Contato.
- Painel admin com login, dashboard visual, cadastro/remoção de produtos, ajustes de estoque e registro de vendas.
- Regras de negócio para indisponibilidade automática com estoque zero e controle manual de disponibilidade.
