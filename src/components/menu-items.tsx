'use client'
import {
    SidebarGroup,
    // SidebarGroupLabel,
    SidebarMenu,
    // SidebarMenuSubButton,
    // SidebarMenuSubItem,
    // SidebarMenuSub,
    // SidebarMenuSubButton,
    // SidebarMenuSubItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"

import { type LucideIcon } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

  export function MenuItem({
    items, 
  }: {
    items: {
        title?: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
    }[]
  }) {


    const navigate = useNavigate()

    return (
        <SidebarGroup>
            <SidebarMenu className="gap-4">
                {items.map((item) => (
                   <SidebarMenuButton onClick={() => navigate({ to: `${item.url}`})}  key={item.title} tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )

  }