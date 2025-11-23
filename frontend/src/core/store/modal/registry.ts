import type { ReactNode } from "react";

export type ModalComponent = (props: any) => ReactNode;

export const modalRegistry: Record<string, ModalComponent> = {};

export const registerModal = (id: string, Component: ModalComponent) => {
    modalRegistry[id] = Component;
    console.log("[modal] registered:", id);
};
