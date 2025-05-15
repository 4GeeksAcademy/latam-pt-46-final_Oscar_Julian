const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            isAuthenticated: false,
            apiUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001", // Updated to use import.meta.env instead of process.env
            message: null
        },
        actions: {
            // Use getActions to call a function within a function
            signup: async (email, password) => {
                const store = getStore();

                try {
                    const response = await fetch(`${store.apiUrl}/api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        setStore({ message: data.message || "Signup failed" });
                        return false;
                    }

                    setStore({ message: "Signup successful! Please login." });
                    return true;
                } catch (error) {
                    console.error("Signup error:", error);
                    setStore({ message: "An error occurred during signup" });
                    return false;
                }
            },

            login: async (email, password) => {
                const store = getStore();

                try {
                    const response = await fetch(`${store.apiUrl}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        setStore({ message: data.message || "Login failed" });
                        return false;
                    }

                    // Save token to sessionStorage
                    sessionStorage.setItem("token", data.token);

                    // Update store
                    setStore({
                        user: data.user,
                        isAuthenticated: true,
                        message: "Login successful!"
                    });

                    return true;
                } catch (error) {
                    console.error("Login error:", error);
                    setStore({ message: "An error occurred during login" });
                    return false;
                }
            },

            logout: () => {
                // Remove token from sessionStorage
                sessionStorage.removeItem("token");

                // Update store
                setStore({
                    user: null,
                    isAuthenticated: false,
                    message: "Logged out successfully"
                });
            },

            validateToken: async () => {
                const store = getStore();
                const token = sessionStorage.getItem("token");

                if (!token) {
                    setStore({ isAuthenticated: false, user: null });
                    return;
                }

                try {
                    const response = await fetch(`${store.apiUrl}/api/user`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        // Token is invalid
                        sessionStorage.removeItem("token");
                        setStore({ isAuthenticated: false, user: null });
                        return;
                    }

                    const userData = await response.json();
                    setStore({ isAuthenticated: true, user: userData });
                } catch (error) {
                    console.error("Token validation error:", error);
                    sessionStorage.removeItem("token");
                    setStore({ isAuthenticated: false, user: null });
                }
            },

            // Clear messages
            clearMessage: () => {
                setStore({ message: null });
            }
        }
    };
};

export default getState;