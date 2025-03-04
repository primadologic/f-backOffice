import ListPage from '@/app/dashboard/report-numbers/list-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/report-numbers/')({
  component: ListPage,
})
