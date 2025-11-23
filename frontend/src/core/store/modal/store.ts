import { create } from "zustand"

interface ModalData {
    payload?: any
    resolver?: (v: any) => void
    onClose?: () => void
}

interface ModalState {
    active: Record<string, ModalData | undefined>

    openModal: (id: string, payload?: any) => Promise<any>
    closeModal: (id: string, result?: any) => void
}

export const useModalStore = create<ModalState>((set, get) => ({
    active: {},

    openModal(id, payload) {
        return new Promise(resolve => {
            set(state => ({
                active: {
                    ...state.active,
                    [id]: { payload, resolver: resolve }
                }
            }));
        });
    },


    closeModal(id, result) {
        const modal = get().active[id]
        if (!modal) return

        modal.resolver?.(result)
        modal.onClose?.()

        const next = { ...get().active }
        delete next[id]

        set({ active: next })
    },
}))
