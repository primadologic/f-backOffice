import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/report-numbers/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello Create Report Number Page "/report-numbers/create"!</div>
}
