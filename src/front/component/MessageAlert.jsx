import { useEffect, useState } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const MessageAlert = () => {
    const { store, actions } = useGlobalReducer();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (store.message) {
            setVisible(true);

            // Ocultar el mensaje después de 5 segundos
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => actions.clearMessage(), 300); // Limpiar después de la animación
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [store.message]);

    // Determinar el tipo de alerta basado en el contenido del mensaje
    const getAlertType = () => {
        if (!store.message) return "info";

        const msg = store.message.toLowerCase();
        if (msg.includes("error") || msg.includes("failed") || msg.includes("no ")) {
            return "danger";
        } else if (msg.includes("success") || msg.includes("exitosa")) {
            return "success";
        } else {
            return "info";
        }
    };

    if (!store.message) return null;

    return (
        <div
            className={`alert alert-${getAlertType()} alert-dismissible alert-message ${visible ? 'show' : 'fade'}`}
            role="alert"
        >
            {store.message}
            <button
                type="button"
                className="btn-close"
                onClick={() => {
                    setVisible(false);
                    setTimeout(() => actions.clearMessage(), 300);
                }}
                aria-label="Close"
            ></button>
        </div>
    );
};