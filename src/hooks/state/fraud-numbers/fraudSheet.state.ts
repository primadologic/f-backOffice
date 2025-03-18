import { create } from 'zustand'
import { FraudNumberNewType } from '@/common/Type/FraudNumber/fraud-numbers'



interface FraudNumberStore {
  isOpen: boolean
  selectedFraudNumber: FraudNumberNewType | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedFraudNumber: (fraudNumber: FraudNumberNewType | null) => void
//   updateStatus: (statusId: string) => void
  reset: () => void
}

export const useFraudNumberStore = create<FraudNumberStore>((set) => ({
  isOpen: false,
  selectedFraudNumber: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedFraudNumber  : (fraudNumber) => set({ selectedFraudNumber: fraudNumber }),
//   updateStatus: (statusId) => set((state) => ({
//     selectedCaseFile: state.selectedCaseFile ? {
//       ...state.selectedCaseFile,
//       status: CaseStatusData.find(s => s.statusId === statusId) || state.selectedCaseFile.status
//     } : null
//   })),
  reset: () => set({ isOpen: false, selectedFraudNumber: null })
}))