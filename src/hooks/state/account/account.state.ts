import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface AccountStore {
  isOpen: boolean
  selectedUser: string | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedUser: (userId: string | null) => void

  reset: () => void
}

export const useAccountAvatarStore = create<AccountStore>()(

    persist(
      (set) => ({
        isOpen: false,
        selectedUser: null,
        setIsOpen: (isOpen) => set({ isOpen }),
        setSelectedUser: (userId) => set({ selectedUser: userId }),
        reset: () => set({ isOpen: false, selectedUser: null }),
      }),
      {
        name: 'account-avatar', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) default: localStorage
        partialize: (state) => ({ selectedUser: state.selectedUser }), // only persist selectedUser
      }
    )
  );


export const useAccountInfoStore = create<AccountStore>()(

    persist(
      (set) => ({
        isOpen: false,
        selectedUser: null,
        setIsOpen: (isOpen) => set({ isOpen }),
        setSelectedUser: (userId) => set({ selectedUser: userId }),
        reset: () => set({ isOpen: false, selectedUser: null }),
      }),
      {
        name: 'account-info', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) default: localStorage
        partialize: (state) => ({ selectedUser: state.selectedUser }), // only persist selectedUser
      }
    )
);
