import { modalRegistry } from "./registry";
import { useModalStore } from "./store";

export function ModalRoot() {
    const active = useModalStore(s => s.active);
    const closeModal = useModalStore(s => s.closeModal);

    return (
        <>
            {Object.entries(active).map(([id, data]) => {
                const Component = modalRegistry[id];
                if (!Component) return null;

                return (
                    <Component
                        key={id}
                        payload={data?.payload}
                        resolver={data?.resolver}
                        onClose={() => closeModal(id)}
                        close={() => closeModal(id)} 
                    />
                );
            })}
        </>
    );
}
