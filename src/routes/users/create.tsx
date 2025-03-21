
import UserCreatePage from '@/app/users/user/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/create')({
  component: UserCreatePage
})

