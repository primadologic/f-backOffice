import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface CaseFileStore {
  isOpen: boolean
  selectedCaseFile: string | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedCaseFile: (caseId: string | null) => void
  reset: () => void
}

export const useCaseFileStore = create<CaseFileStore>((set) => ({
  isOpen: false,
  selectedCaseFile: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedCaseFile: (caseId) => set({ selectedCaseFile: caseId}),
  
  reset: () => set({ isOpen: false, selectedCaseFile: null })
}))


export const useDetailCaseFileStore = create<CaseFileStore>() (
  persist(
    (set) => ({
      isOpen: false,
      selectedCaseFile: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedCaseFile: (caseId) => set({ selectedCaseFile: caseId }),
      
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
      setSelectedCaseFile: (caseId) => set({ selectedCaseFile: caseId }),
      reset: () => set({ isOpen: false, selectedCaseFile: null }),
    }),
    {
      name: "updateCaseFile-store", // Unique key in localStorage
    }
  )
);

export const useDeleteCaseFileStore = create<CaseFileStore>()(
  persist(
    (set) => ({
    isOpen: false,
    selectedCaseFile: null,
    setIsOpen: (isOpen) => set({ isOpen }),
    setSelectedCaseFile: (caseId) => set({ selectedCaseFile: caseId }),
    reset: () => set({ isOpen: false, selectedCaseFile: null })
  }),
  {
    name: 'deleteCaseFile-store'
  }
  )
);


export const useAssignInvestigatorStore = create<CaseFileStore>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedCaseFile: null,
      setIsOpen: (isOpen) => set({ isOpen }),
      setSelectedCaseFile: (caseId) => set({ selectedCaseFile: caseId }),
      reset: () => set({ isOpen: false, selectedCaseFile: null })
    }),
    {
      name: 'assignInvestigator-caseFileStore'
    }  
  )  
)

