
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"

  import { type LucideIcon } from "lucide-react"
import { useRouter } from "@tanstack/react-router"

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

    const router = useRouter();

    return (
        <SidebarGroup>
            <SidebarMenu className="gap-4">
                {items.map((item) => (
                   <SidebarMenuButton className="cursor-pointer" onClick={() => router.navigate({ to: `${item.url}` })}  key={item.title} tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
  }

