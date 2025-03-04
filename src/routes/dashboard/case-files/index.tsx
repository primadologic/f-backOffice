import ListPage from '@/app/dashboard/case-files/list-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/case-files/')({
  component: ListPage,
})

