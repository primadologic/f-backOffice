import { create } from 'zustand'
import { CaseFileType } from '@/common/Type/CaseFile/CaseFile.type'


interface CaseFileStore {
  isOpen: boolean
  selectedCaseFile: CaseFileType | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedCaseFile: (caseFile: CaseFileType | null) => void
  // updateStatus: (statusId: string) => void
  reset: () => void
}

export const useCaseFileStore = create<CaseFileStore>((set) => ({
  isOpen: false,
  selectedCaseFile: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
  
  // updateStatus: (statusId) => set((state) => ({
  //   selectedCaseFile: state.selectedCaseFile ? {
  //     ...state.selectedCaseFile,
  //     status: CaseStatusData.find(s => s.statusId === statusId) || state.selectedCaseFile.status
  //   } : null
  // })),
  reset: () => set({ isOpen: false, selectedCaseFile: null })
}))