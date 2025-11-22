import type { JSX } from "react"

export interface ModalRegistryItem {
    id: string
    Component: (props: any) => JSX.Element
}

export const modalRegistry: ModalRegistryItem[] = []

export const registerModal = (item: ModalRegistryItem) => {
    modalRegistry.push(item)
}
