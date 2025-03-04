import CreatePage from '@/app/dashboard/report-numbers/create-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/report-numbers/create')({
  component: CreatePage,
})
