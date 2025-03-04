import CreatePage from '@/app/dashboard/case-files/create-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/case-files/create')({
  component: CreatePage,
})

