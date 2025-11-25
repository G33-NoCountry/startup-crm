"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeLink, setActiveLink] = useState(pathname);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const getPageTitle = () => {
        const titles: { [key: string]: string } = {
            "/dashboard": "Dashboard",
            "/contacts": "Contactos",
            "/conversations": "Conversaciones",
            "/calendar": "Calendario",
            "/kanban": "Kanban",
            "/settings": "Ajustes",
            "/team-management": "Administrar equipo",
        };
        return titles[pathname] || "Dashboard";
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-foreground text-white p-4 hidden md:block">
                <div className="text-xl font-bold pt-4 px-4 mb-8 gap-2">
                    <Image
                        src="images/logo-start.svg"
                        alt="Logo"
                        width={90}
                        height={50}
                        priority
                    />
                    <hr className="h-1 w-16 my-3 bg-accent rounded-lg border-none"></hr>
                </div>
                <nav className="space-y-2 px-1 gap-6">
                    <Link
                        href="/dashboard"
                        onClick={() => setActiveLink("/dashboard")}
                        onMouseEnter={() => setHoveredLink("/dashboard")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/dashboard" ? "images/dashboard-orange.svg" : "images/dashboard.svg"}
                            alt="Dashboard"
                            width={16}
                            height={16}
                            priority
                        />
                        Dashboard
                    </Link>
                    <Link
                        href="/contacts"
                        onClick={() => setActiveLink("/contacts")}
                        onMouseEnter={() => setHoveredLink("/contacts")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/contacts" ? "images/contacto-orange.svg" : "images/contacto.svg"}
                            alt="Contactos"
                            width={16}
                            height={16}
                            priority
                        />
                        Contactos
                    </Link>
                    <Link
                        href="/conversations"
                        onClick={() => setActiveLink("/conversations")}
                        onMouseEnter={() => setHoveredLink("/conversations")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/conversations" ? "images/conversaciones-orange.svg" : "images/conversaciones.svg"}
                            alt="Conversaciones"
                            width={16}
                            height={16}
                            priority
                        />
                        Conversaciones
                    </Link>
                    <Link
                        href="/calendar"
                        onClick={() => setActiveLink("/calendar")}
                        onMouseEnter={() => setHoveredLink("/calendar")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/calendar" ? "images/calendario-orange.svg" : "images/calendario.svg"}
                            alt="Calendario"
                            width={16}
                            height={16}
                            priority
                        />
                        Calendario
                    </Link>
                    <Link
                        href="/kanban"
                        onClick={() => setActiveLink("/kanban")}
                        onMouseEnter={() => setHoveredLink("/kanban")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/kanban" ? "images/kanban-orange.svg" : "images/kanban.svg"}
                            alt="Kanban"
                            width={16}
                            height={16}
                            priority
                        />
                        Kanban
                    </Link>
                    <Link
                        href="/settings"
                        onClick={() => setActiveLink("/settings")}
                        onMouseEnter={() => setHoveredLink("/settings")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/settings" ? "images/ajustes-orange.svg" : "images/ajustes.svg"}
                            alt="Ajustes"
                            width={16}
                            height={16}
                            priority
                        />
                        Ajustes
                    </Link>
                    <p className="text-white text-xs px-2 mt-4">Mi equipo</p>
                    <Link
                        href="/team-management"
                        onClick={() => setActiveLink("/team-management")}
                        onMouseEnter={() => setHoveredLink("/team-management")}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="gap-2 flex items-center px-4 py-2 hover:bg-[#393941] rounded"
                    >
                        <Image
                            src={hoveredLink === "/team-management" ? "images/dashboard-orange.svg" : "images/dashboard.svg"}
                            alt="Administrar equipo"
                            width={16}
                            height={16}
                            priority
                        />
                        Administrar equipo
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>

                        <div className="flex items-center gap-6">
                            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-sm text-gray-700">
                                    Hola, <span className="font-semibold">{user?.name || "Usuario"}</span>
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                                title="Cerrar sesión"
                            >
                                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}