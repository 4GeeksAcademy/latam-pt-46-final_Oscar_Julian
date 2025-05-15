import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/authContext";

export const ProtectedRoute = ({ children }) => {
    const { store } = useContext(Context);

    // If not authenticated, redirect to login
    if (!store.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};