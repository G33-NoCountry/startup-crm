"use client"

import * as React from "react"
import {
  MessageCircle,
  LayoutDashboard,
  CalendarDays,
  Settings,
  Contact,
  SquareKanban,
  UserCog,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavDocuments } from "@/components/ui/nav-documents"
import { NavMain } from "@/components/ui/nav-main"
import Link from "next/link"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Contactos",
      url: "/contacts",
      icon: Contact,
    },
    {
      title: "Conversaciones",
      url: "/conversations",
      icon: MessageCircle,
    },
    {
      title: "Calendario",
      url: "/calendar",
      icon: CalendarDays,
    },
    {
      title: "Kanban/Deals",
      url: "/kanban",
      icon: SquareKanban,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    }
  ],
  documents: [
    {
      name: "Administrar Equipos",
      url: "/equipos",
      icon: UserCog,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
              <nav className="space-y-2">
                <Link href="/dashboard" className="block px-2 py-2">
                  <div className="text-xl font-bold pt-4 mb-4 gap-2">
                      {/* <Image
                          src="images/logo-start.svg"
                          alt="Logo"
                          width={90}
                          height={50}
                          priority
                      /> */}
                      <span className="text-4xl font-bold">Start</span>
                      <hr className="h-1 w-16 my-3 bg-accent rounded-lg border-none" />
                  </div>
                </Link>
            </nav>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
    </Sidebar>
  )
}