import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface UserStore {
  isOpen: boolean
  selectedUser: string | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedUser: (userId: string | null) => void

  reset: () => void
}

export const useUserStore = create<UserStore>()(

    persist(
      (set) => ({
        isOpen: false,
        selectedUser: null,
        setIsOpen: (isOpen) => set({ isOpen }),
        setSelectedUser: (userId) => set({ selectedUser: userId }),
        reset: () => set({ isOpen: false, selectedUser: null }),
      }),
      {
        name: 'user-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) default: localStorage
        partialize: (state) => ({ selectedUser: state.selectedUser }), // only persist selectedUser
      }
    )
  );


  export const useUpdateUserStore = create<UserStore>()(
    persist(
      (set) => ({
        isOpen: false,
        selectedUser: null,
        setIsOpen: (isOpen) => set({ isOpen }),
        setSelectedUser: (userId) => set({ selectedUser: userId }),
        reset: () => set({ isOpen: false, selectedUser: null }),
      }),
      {
        name: 'update-user-storage', // Unique name for storage
        storage: createJSONStorage(() => localStorage), // Use localStorage
        partialize: (state) => ({ selectedUser: state.selectedUser }), // only persist selectedUser
      }
    )
  );

  
export const useDeleteUserStore = create<UserStore>()(
    persist(
      (set) => ({
        isOpen: false,
        selectedUser: null,
        setIsOpen: (isOpen) => set({ isOpen }),
        setSelectedUser: (userId) => set({ selectedUser: userId }),
        reset: () => set({ isOpen: false, selectedUser: null }),
      }),
      {
        name: 'delete-user-storage', // Unique name for storage
        storage: createJSONStorage(() => localStorage), // Use localStorage
        partialize: (state) => ({ selectedUser: state.selectedUser }), // only persist selectedUser
      }
    )
  );
  