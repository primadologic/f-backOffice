import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/case-files/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='text-xl font-semibold'>Hello Case File Create Page "/dashboard/case-files/create"!</div>
}
