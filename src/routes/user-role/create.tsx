import Page from '@/app/users/user-role/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user-role/create')({
  component: Page,
})

