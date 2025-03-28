import Forbidden from '@/components/custom-ui/RBAC/forbidden'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forbidden')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Forbidden />
}
