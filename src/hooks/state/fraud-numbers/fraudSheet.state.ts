import { create } from 'zustand'
import { FraudNumberType } from '@/common/Type/FraudNumber/FraudNumber.type'



interface FraudNumberStore {
  isOpen: boolean
  selectedFraudNumber: FraudNumberType | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedFraudNumber: (fraudNumber: FraudNumberType | null) => void
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