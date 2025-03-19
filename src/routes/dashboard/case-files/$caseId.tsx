import DetailViewPage from '@/app/dashboard/case-files/detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/case-files/$caseId')({
  component: DetailViewPage,
})

