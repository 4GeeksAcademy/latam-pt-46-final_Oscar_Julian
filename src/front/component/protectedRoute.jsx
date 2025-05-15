
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const ProtectedRoute = ({ children }) => {
    const { store, actions } = useGlobalReducer();
    const [isValidating, setIsValidating] = useState(true);

    // Validate token when accessing protected routes
    useEffect(() => {
        const validateAuth = async () => {
            await actions.validateToken();
            setIsValidating(false);
        };

        validateAuth();
    }, []);

    // Show loading indicator while validating token
    if (isValidating) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!store.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};