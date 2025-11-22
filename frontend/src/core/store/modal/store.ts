import { create } from "zustand"

interface ModalState {
    modals: Record<
        string,
        {
            isVisible: boolean
            payload?: any
            resolver?: (data: any) => void
        }
    >

    openModal: (id: string, payload?: any) => Promise<any>
    closeModal: (id: string) => void
}

export const useModalStore = create<ModalState>((set, get) => ({
    modals: {},

    openModal(id, payload) {
        return new Promise((resolve) => {
            const m = get().modals
            set({
                modals: {
                    ...m,
                    [id]: {
                        isVisible: true,
                        payload,
                        resolver: resolve,
                    },
                },
            })
        })
    },

    closeModal(id) {
        const m = get().modals
        set({
            modals: {
                ...m,
                [id]: {
                    ...m[id],
                    isVisible: false,
                },
            },
        })
    },
}))
