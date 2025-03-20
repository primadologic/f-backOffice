import { createFileRoute } from '@tanstack/react-router'
import Page from '@/app/users/user-role/page'

export const Route = createFileRoute('/user-role/')({
  component: Page,
})

