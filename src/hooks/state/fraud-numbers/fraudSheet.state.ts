import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface FraudNumberStore {
  isOpen: boolean
  selectedFraudNumber: string | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedFraudNumber: (fraudNumber: string | null) => void
  reset: () => void
}

export const useFraudNumberStore = create<FraudNumberStore>() (
  persist(
    (set) => ({

      isOpen: false,
      selectedFraudNumber: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedFraudNumber  : (fraudNumber) => set({ selectedFraudNumber: fraudNumber }),
      reset: () => set({ isOpen: false, selectedFraudNumber: null })
    }),
    {
      name: "update-fraudNumber"
    }
  )
)


export const useDeleteFraudNumberStore = create<FraudNumberStore>() (
  persist(
    (set) => ({
      isOpen: false,
      selectedFraudNumber: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedFraudNumber  : (fraudNumber) => set({ selectedFraudNumber: fraudNumber }),
      reset: () => set({ isOpen: false, selectedFraudNumber: null })
    }),
    {
      name: 'delete-FraudNumber'
    }
  )
)