import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/report-numbers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello Reported Numbers List page "/report-numbers/"!</div>
}
