
import UsersListPage from '@/app/users/user/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: UsersListPage,
})

// function RouteComponent() {
//   return  (
//       <div className="">
//         <DashboardLayout>
//           <UserListPage />
//         </DashboardLayout>
//       </div>
//     )
// }
