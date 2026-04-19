import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main>
      <section className="container-luiza grid gap-8 py-16 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-medium text-rose-400">Moda feminina com curadoria</p>
          <h1 className="text-4xl font-semibold leading-tight">Delicadeza e estilo para todas as ocasiões.</h1>
          <p className="text-gray-600">Peças selecionadas para valorizar sua beleza com conforto, elegância e autenticidade.</p>
          <Link href="/catalogo" className="inline-flex rounded-full bg-rose-300 px-6 py-3 text-sm font-medium text-white hover:bg-rose-400">Ver catálogo</Link>
        </div>
        <Image
          alt="Moda feminina elegante"
          src="https://images.unsplash.com/photo-1464863979621-258859e62245"
          width={1000}
          height={800}
          className="rounded-3xl object-cover shadow-soft"
        />
      </section>
    </main>
  );
}
