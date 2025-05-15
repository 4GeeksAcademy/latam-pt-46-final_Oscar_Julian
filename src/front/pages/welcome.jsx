import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Welcome = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Verify user authentication when component loads
    useEffect(() => {
        const checkAuth = async () => {
            await actions.validateToken();
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, loading]);

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    // Show loading state or nothing if not authenticated
    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!store.isAuthenticated) {
        return null;
    }

    return (
        <div className="container py-5">
            <div className="card shadow">
                <div className="card-body p-5">
                    <h1 className="mb-4">Welcome, {store.user?.email}!</h1>
                    <p className="lead">You have successfully logged in to your personal library.</p>

                    <div className="mt-4">
                        <h5>Your account information:</h5>
                        <ul className="list-group mb-4">
                            <li className="list-group-item">
                                <strong>User ID:</strong> {store.user?.id}
                            </li>
                            <li className="list-group-item">
                                <strong>Email:</strong> {store.user?.email}
                            </li>
                        </ul>

                        <div className="alert alert-info">
                            <i className="fas fa-info-circle me-2"></i>
                            This is a protected page that only authenticated users can access.
                        </div>

                        <div className="mt-4">
                            <Link to="/" className="btn btn-primary me-2">
                                <i className="fas fa-home me-2"></i>
                                Go to Home
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt me-2"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};