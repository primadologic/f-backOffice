
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"

  import { type LucideIcon } from "lucide-react"
import { useRouter } from "@tanstack/react-router"

  export function AccountItems({
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
            <SidebarGroupLabel>Accounts Settings</SidebarGroupLabel>
            <SidebarMenu className="gap-4">
                {items.map((item) => (
                   <SidebarMenuButton onClick={() => router.navigate({ to: `${item.url}` })}  key={item.title} tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
  }

