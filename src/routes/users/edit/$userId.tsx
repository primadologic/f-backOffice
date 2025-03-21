import UpdateUserPage from '@/app/users/user/update'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/edit/$userId')({
  component: UpdateUserPage
})

// function RouteComponent() {
//   return <div>Hello "/users/edit/$userId"!</div>
// }
