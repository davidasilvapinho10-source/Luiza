import { AdminNav } from '@/components/admin-nav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container-luiza py-8">
      <div className="grid gap-6 md:grid-cols-[220px,1fr]">
        <AdminNav />
        <div>{children}</div>
      </div>
    </main>
  );
}
