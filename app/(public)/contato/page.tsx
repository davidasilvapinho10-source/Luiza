export default function ContatoPage() {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/bazardaluiza';
  return (
    <main className="container-luiza py-14">
      <div className="grid gap-6 rounded-2xl bg-white p-8 shadow-soft md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-3xl font-semibold">Contato</h1>
          <p className="text-gray-600">WhatsApp: (11) 99999-9999</p>
          <a className="text-rose-500 underline" href={instagram}>Instagram</a>
          <p className="mt-2 text-gray-500">Endereço opcional: Centro, sua cidade.</p>
        </div>
        <form className="space-y-3">
          <input placeholder="Nome" className="w-full rounded-xl border p-3" />
          <input placeholder="Email" className="w-full rounded-xl border p-3" />
          <textarea placeholder="Mensagem" className="h-28 w-full rounded-xl border p-3" />
          <button type="button" className="rounded-full bg-rose-300 px-5 py-2 text-white">Enviar</button>
        </form>
      </div>
    </main>
  );
}
