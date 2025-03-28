import Page from '@/app/users/account-settings/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accounts/')({
  component: Page,
})

