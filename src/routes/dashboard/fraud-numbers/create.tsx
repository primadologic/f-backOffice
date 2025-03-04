import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fraud-numbers/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='text-xl font-semibold'>Hello Fraud Numbers create page  "/dashboard/fraud-numbers/create"!</div>
}
