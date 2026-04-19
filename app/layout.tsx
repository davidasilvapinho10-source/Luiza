import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bazar da Luiza',
  description: 'Moda feminina elegante com gestão profissional de produtos e vendas.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
