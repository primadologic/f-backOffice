
import { UserType } from '@/common/Type/UserRole.type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



interface UserStore {
  isOpen: boolean
  selectedUser: UserType | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedUser: (userId: UserType | null) => void

  reset: () => void
}

export const useUserStore = create<UserStore>() (
    persist(
        (set) => ({
            isOpen: false,
            selectedUser: null,
            setIsOpen: (isOpen) => set({ isOpen }),
            setSelectedUser: (userId) => set({ selectedUser: userId }),

            reset: () => set({ isOpen: false, selectedUser: null })
        }),
        {
            name: 'user'
        }
    )
)