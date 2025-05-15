
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Welcome = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();

    // Redirigir si no está logueado
    useEffect(() => {
        if (!store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated]);

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    // Si no está autenticado, mostrar carga o nada
    if (!store.isAuthenticated) {
        return null;
    }

    return (
        <div className="container">
            <div className="welcome-container">
                <h1>Welcome, {store.user?.email}!</h1>
                <p className="lead">You have successfully logged in to the application.</p>

                <div className="mt-4">
                    <p>This is a protected page that only authenticated users can access.</p>
                    <p>Your user information:</p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>User ID:</strong> {store.user?.id}
                        </li>
                        <li className="list-group-item">
                            <strong>Email:</strong> {store.user?.email}
                        </li>
                    </ul>
                </div>

                <button
                    className="btn btn-danger btn-lg mt-4"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};