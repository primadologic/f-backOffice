import ListPage from '@/app/dashboard/fraud-numbers/list-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fraud-numbers/')({
  component: ListPage,
})

