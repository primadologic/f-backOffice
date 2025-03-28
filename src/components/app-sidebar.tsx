"use client"

import * as React from "react"
import {
  // AudioWaveform,
  BookOpen,
  // Bot,
  // ChartColumn,
  // Command,
  // Frame,
  // GalleryVerticalEnd,
  // Map,
  // PieChart,
  // Settings2,
  // SquareTerminal,
  // MessageSquareWarning,
  // Briefcase,
  Flag,
  BriefcaseBusiness,
  LayoutDashboard,
  Users,
  ShieldUser,
  CircleUser,
  
} from "lucide-react"

// import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { MenuItem } from "./menu-items"
import Logo from "./custom-ui/logo"
import NavBrand from "./custom-ui/navbar-brand"
import { AccountItems } from "./account"
import { useCurrentUser } from "@/service/accounts/fetchCurrentUser"



// This is sample data.
const data = {
  // user: {
  //   name: "Prince Adimado",
  //   email: "prince.adimado@afrilogicsolutions.com",
  //   // avatar: "/avatars/shadcn.jpg",
  //   avatar: "https://avatars.githubusercontent.com/u/149607045?v=4",
  // },
  teams: [
    {
      name: "FraudWall",
      logo: Logo,
      plan: "Back Office Portal",
    },
    {
      name: "Visit FraudWall.ai",
      logo: Logo,
      plan: "Startup",
    },
  ],




  // navMain: [

  //   {
  //     title: "Menu",
  //     url: "/accounts",
  //     isActive: true,
  //     items: [
  //       {
  //         title: "My Profile",
  //         url: "/accounts",
  //         Icon: CircleUser,
  //       },
  //     ],

     
  //   },
  // ],

  // ],
  //   {
  //     title: "Case Files",
  //     url: "#",
  //     icon: Briefcase,
  //     items: [
  //       {
  //         title: "Genesis",
  //         url: "#",
  //       },
  //       {
  //         title: "Explorer",
  //         url: "#",
  //       },
  //       {
  //         title: "Quantum",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Report Number",
  //     url: "#",
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Fraud Numbers",
  //     url: "#",
  //     icon: Flag,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: "General",
  //         url: "#",
  //       },
  //       {
  //         title: "Team",
  //         url: "#",
  //       },
  //       {
  //         title: "Billing",
  //         url: "#",
  //       },
  //       {
  //         title: "Limits",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // projects: [
  //   {
  //     name: "Account Settings",
  //     url: "#",
  //     icon: Settings ,
  //   },
  //   // {
  //   //   name: "Sales & Marketing",
  //   //   url: "#",
  //   //   icon: PieChart,
  //   // },
  //   // {
  //   //   name: "Travel",
  //   //   url: "#",
  //   //   icon: Map,
  //   // },
  // ],

  menuItems: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard ,
      isActive: true
    },
    {
      title: 'Report Numbers',
      url: "/dashboard/report-numbers",
      icon: BookOpen ,
      isActive: true
    },
    {
      title: 'Case Files',
      url: "/dashboard/case-files",
      icon: BriefcaseBusiness ,
      isActive: true
    },
    {
      title: 'Fraud Numbers',
      url: "/dashboard/fraud-numbers",
      icon: Flag ,
      isActive: true
    },
    {
      title: 'Users',
      url: "/users",
      icon: Users,
      isActive: true
    },
    {
      title: 'User Roles',
      url: "/user-role",
      icon: ShieldUser,
      isActive: true
    },
  ],

  accountItems: [
    {
      title: "My Profile",
      url: "/accounts",
      icon: CircleUser,
      isActive: true
    },
  ],

}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: userData   } = useCurrentUser();

  const firstName = userData?.data?.firstName ?? '';
  const lastName = userData?.data?.lastName ?? '';

  const user = {
    name: [firstName, lastName].filter(Boolean).join(' '),
    firstName: firstName,
    lastName: lastName,
    email: userData?.data?.email ?? 'user@fraudwall.ai',
    avatar: userData?.data?.avatarUrl ?? 'https://github.com/shadcn.png'
  }

  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <NavBrand />
      </SidebarHeader>
      <SidebarContent className="dark:bg-custom_theme-black">
       
        <MenuItem items={data.menuItems} />
        <AccountItems items={data.accountItems} />


        {/* <NavProjects projects={data.projects} />  */}
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
