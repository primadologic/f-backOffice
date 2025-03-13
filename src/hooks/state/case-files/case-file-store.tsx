import { create } from 'zustand'
import { CaseFileType } from '@/common/Type/CaseFile/CaseFile.type'


interface CaseFileStore {
  isOpen: boolean
  selectedCaseFile: CaseFileType | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedCaseFile: (caseFile: CaseFileType | null) => void
  reset: () => void
}

export const useCaseFileStore = create<CaseFileStore>((set) => ({
  isOpen: false,
  selectedCaseFile: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
  
  reset: () => set({ isOpen: false, selectedCaseFile: null })
}))

export const useDeleteCaseFileStore = create<CaseFileStore>((set) => ({
  isOpen: false,
  selectedCaseFile: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
  
  reset: () => set({ isOpen: false, selectedCaseFile: null })
}))


export const useAssignInvestigatorStore = create<CaseFileStore>((set) => ({
  isOpen: false,
  selectedCaseFile: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
  
  reset: () => set({ isOpen: false, selectedCaseFile: null })
}))