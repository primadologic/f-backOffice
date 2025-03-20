import DashboardLayout from '@/app/dashboard/dashBoardLayout'
import UserListPage from '@/features/users/pages/user/list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="">
      <DashboardLayout>
        <UserListPage />
      </DashboardLayout>
    </div>
  )
}
