import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const ProtectedRoute = ({ children }) => {
    const { store } = useGlobalReducer();

    // Si no está autenticado, redirigir a login
    if (!store.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};