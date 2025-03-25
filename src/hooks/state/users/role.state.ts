import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserRoleStore {
  isOpen: boolean;
  selectedRoleId: string | null;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedRoleId: (roleId: string | null) => void;
  reset: () => void;
}

export const useUserRoleStore = create<UserRoleStore>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedRoleId: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedRoleId: (roleId) => set({ selectedRoleId: roleId }),
      reset: () => set({ isOpen: false, selectedRoleId: null }),
    }),
    {
      name: 'user-role-storage', // Unique name for storage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({ selectedRoleId: state.selectedRoleId }), // only persist selectedRoleId
    }
  )
);