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

// This is sample data.
const data = {
  user: {
    name: "Prince Adimado",
    email: "prince.adimado@afrilogicsolutions.com",
    // avatar: "/avatars/shadcn.jpg",
    avatar: "https://avatars.githubusercontent.com/u/149607045?v=4",
  },
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
  //     title: "Dashboard Analytics",
  //     url: "#",
  //     isActive: true,
  //     items: [
  //       {
  //         title: "Overview",
  //         url: "/dashboard",
  //         Icon: ChartColumnStacked,
  //       },
  //       {
  //         title: "FraudWall Client",
  //         url: "/dashboard/analytics/fraudwall",
  //         icon: FileChartColumnIncreasing 
  //       },
  //       {
  //         title: "Verification Insights",
  //         url: "/dashboard/analytics/verification",
  //         icon: ChartLine 
  //       },
  //       {
  //         title: "Report Numbers",
  //         url: "/dashboard/analytics/reports",
  //         icon: ChartPie,
  //       },
  //       {
  //         title: "Case Files",
  //         url: "/dashboard/analytics/case-files",
  //         icon: ChartNoAxesCombined,
  //       },
  //     ],

     
  //   },

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
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
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
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <NavBrand />
      </SidebarHeader>
      <SidebarContent className="dark:bg-custom_theme-black">
        {/* <NavMain items={data.navMain} /> */}
        <MenuItem items={data.menuItems} />
        {/* <NavProjects projects={data.projects} />  */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
