import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/case-files/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='text-xl font-semibold'>Hello Case Files List Page "/dashboard/case-files/"!</div>
}
