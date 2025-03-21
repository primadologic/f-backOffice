import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/role/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/users/role/"!</div>
}
