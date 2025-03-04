import CreatePage from '@/app/dashboard/fraud-numbers/create-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fraud-numbers/create')({
  component: CreatePage,
})
