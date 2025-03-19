import { CaseFileType } from '@/common/Type/CaseFile/CaseFile.type'
import { create } from 'zustand'
import { persist } from "zustand/middleware";

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


export const useDetailCaseFile = create<CaseFileStore>() (
  persist(
    (set) => ({
      isOpen: false,
      selectedCaseFile: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
      
      reset: () => set({ isOpen: false, selectedCaseFile: null })
    }),
    {
      name: "caseFile-detail-store"
    }
  )
)


export const useUpdateCaseFileStore = create<CaseFileStore>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedCaseFile: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
      reset: () => set({ isOpen: false, selectedCaseFile: null }),
    }),
    {
      name: "update-caseFile-store", // Unique key in localStorage
    }
  )
);

export const useDeleteCaseFileStore = create<CaseFileStore>() (
  persist(
    (set) => ({
      isOpen: false,
      selectedCaseFile: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
      
      reset: () => set({ isOpen: false, selectedCaseFile: null })
    }),
    {
      name: "delete-caseFile-store"
    }
  )
)



export const useAssignInvestigatorStore = create<CaseFileStore>() (
  persist(
    (set) => ({
  
      isOpen: false,
      selectedCaseFile: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedCaseFile: (suspectNumber) => set({ selectedCaseFile: suspectNumber }),
      reset: () => set({ isOpen: false, selectedCaseFile: null })    
    }),
    {
      name: "assignInvestigator-caseFile-store"
    }

  )
)