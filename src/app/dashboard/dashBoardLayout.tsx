import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/custom-ui/theme-toggle"
import { ProtectedRoute } from "@/components/providers/protected-route"

import { Button } from "@/components/ui/button"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell } from "lucide-react"


interface DashLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({children, }: DashLayoutProps) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex  !w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            {/* <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div> */}
            <div className="w-full flex justify-between items-center ">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb> */}
              </div>
              <div className="px-7 flex flex-row items-center gap-x-5">
                <ModeToggle />
                {/* <h2 className="font-medium">Portal | FraudWall</h2> */}
                  <Button 
                    size={'sm'}
                    variant={'outline'}
                    className=""
                  >
                    <Bell className="" />
                  </Button>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 px-7 dark:bg-custom_theme-black">
          
            { children }

          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
