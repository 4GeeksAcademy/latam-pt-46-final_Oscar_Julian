import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const ProtectedRoute = ({ children }) => {
    const { store, actions } = useGlobalReducer();

    // Validar token al acceder a rutas protegidas
    React.useEffect(() => {
        actions.validateToken();
    }, []);

    // Si no está autenticado, redirigir a login
    if (!store.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};