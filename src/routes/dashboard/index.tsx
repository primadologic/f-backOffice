import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='text-xl font-semibold'>Hello dash board overview "/dashboard/"!</div>
}
