

import Page from '@/app/dashboard/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Page
})

