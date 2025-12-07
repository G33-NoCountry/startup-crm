"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Bell, LogOut, User, LayoutDashboard, Users, MessageSquare, Calendar, Kanban as KanbanIcon, Settings, UsersRound, Tag } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { RouteGuard } from "@/components/shared/route-guard"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuthStore()

    const handleLogout = async () => {
        await logout()
        router.push("/login")
    }

    const getPageTitle = () => {
        const titles: { [key: string]: string } = {
            "/dashboard": "Dashboard",
            "/contacts": "Contactos",
            "/tags": "Etiquetas",
            "/conversations": "Conversaciones",
            "/calendar": "Calendario",
            "/kanban": "Kanban",
            "/settings": "Ajustes",
            "/equipos": "Administrar equipo",
        }
        return titles[pathname] || "Dashboard"
    }

    const mainMenuItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/contacts", label: "Contactos", icon: Users },
        { href: "/tags", label: "Etiquetas", icon: Tag },
        { href: "/conversations", label: "Conversaciones", icon: MessageSquare },
        { href: "/calendar", label: "Calendario", icon: Calendar },
        { href: "/kanban", label: "Kanban", icon: KanbanIcon },
        { href: "/settings", label: "Ajustes", icon: Settings },
    ]

    const teamMenuItems = [
        { href: "/teams", label: "Administrar equipo", icon: UsersRound },
    ]

    return (
        <RouteGuard requireAuth={true}>
            <SidebarProvider defaultOpen={true}>
                <Sidebar collapsible="offcanvas" className="bg-foreground border-none">
                    <SidebarHeader className="border-b border-sidebar-border/20 px-4 py-6">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/logo-start.svg"
                                alt="Logo"
                                width={90}
                                height={50}
                                priority
                            />
                        </div>
                        <hr className="h-1 w-16 mt-3 bg-accent rounded-lg border-none" />
                    </SidebarHeader>

                <SidebarContent className="px-2">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {mainMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.href}
                                            className="hover:bg-[#393941] data-[active=true]:bg-[#393941] data-[active=true]:text-white"
                                        >
                                            <Link href={item.href}>
                                                <item.icon className="size-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <Separator className="my-2 bg-sidebar-border/20" />

                    <SidebarGroup>
                        <SidebarGroupLabel className="text-white/70 text-xs px-2">
                            Mi equipo
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {teamMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.href}
                                            className="hover:bg-[#393941] data-[active=true]:bg-accent data-[active=true]:text-white"
                                        >
                                            <Link href={item.href}>
                                                <item.icon className="size-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
                                {getPageTitle()}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Bell className="size-5 text-gray-600" />
                                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full" />
                            </button>

                            <div className="hidden md:flex items-center gap-3">
                                <div className="size-9 bg-accent rounded-full flex items-center justify-center">
                                    <User className="size-5 text-white" />
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
                                <LogOut className="size-5 text-gray-600 group-hover:text-red-600" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
        </RouteGuard>
    )
}
