import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/role/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/users/role/create"!</div>
}
