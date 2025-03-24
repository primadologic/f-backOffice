import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserRoleStore {
  isOpen: boolean;
  selectedRoleId: string | null; // Store only roleId, not the full object
  setIsOpen: (isOpen: boolean) => void;
  setSelectedRoleId: (roleId: string | null) => void; // Update only roleId
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
      name: "user-role",
    }
  )
);
