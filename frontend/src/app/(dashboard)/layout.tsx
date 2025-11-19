import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-foreground text-white p-4 hidden md:block">
                <div className="text-xl font-bold mb-8">Startup CRM</div>
                <nav className="space-y-2">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Dashboard
                    </Link>
                    <Link href="/contacts" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Contactos
                    </Link>
                    <Link href="/conversations" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Conversaciones
                    </Link>
                    <Link href="/calendar" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Calendario
                    </Link>
                    <Link href="/kanban" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Kanban
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        ajustes
                    </Link>
                </nav>
            </aside>

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}