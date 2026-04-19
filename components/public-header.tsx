import Link from 'next/link';

const nav = [
  { href: '/', label: 'Início' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="container-luiza flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-rose-400">Bazar da Luiza</Link>
        <nav className="flex gap-5 text-sm text-gray-600">
          {nav.map((item) => (
            <Link className="hover:text-rose-400" key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
