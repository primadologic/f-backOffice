import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fraud-numbers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='text-xl font-semibold'>Hello Fraud Number List page "/dashboard/fraud-numbers/"!</div>
}
