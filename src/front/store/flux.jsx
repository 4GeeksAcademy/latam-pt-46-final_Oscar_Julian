const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            isAuthenticated: false,
            apiUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
            message: null,
            isLoading: false
        },
        actions: {
            // Use getActions to call a function within a function
            signup: async (email, password) => {
                const store = getStore();

                setStore({ isLoading: true });
                console.log(store.apiUrl)
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

                    // First check if the response is ok before trying to parse JSON
                    if (!response.ok) {
                        // Try to parse the error message if possible
                        let errorMessage = "Signup failed";
                        try {
                            const errorData = await response.json();
                            errorMessage = errorData.message || errorMessage;
                        } catch (jsonError) {
                            // If JSON parsing fails, use HTTP status text
                            errorMessage = `Signup failed: ${response.statusText || errorMessage}`;
                        }

                        setStore({
                            message: errorMessage,
                            isLoading: false
                        });
                        return false;
                    }

                    // The response is ok, now try to parse it
                    try {
                        const data = await response.json();
                        setStore({
                            message: data.message || "Signup successful! Please login.",
                            isLoading: false
                        });
                        return true;
                    } catch (jsonError) {
                        // If there's no JSON but the response was OK, still consider it a success
                        console.warn("Warning: Received empty or invalid JSON response on successful signup");
                        setStore({
                            message: "Signup successful! Please login.",
                            isLoading: false
                        });
                        return true;
                    }
                } catch (error) {
                    console.error("Signup error:", error);
                    setStore({
                        message: "Network error. Please check your connection and try again.",
                        isLoading: false
                    });
                    return false;
                }
            },

            login: async (email, password) => {
                const store = getStore();

                setStore({ isLoading: true });

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

                    // Check if the response is ok before trying to parse JSON
                    if (!response.ok) {
                        // Try to parse the error message if possible
                        let errorMessage = "Login failed";
                        try {
                            const errorData = await response.json();
                            errorMessage = errorData.message || errorMessage;
                        } catch (jsonError) {
                            // If JSON parsing fails, use HTTP status text
                            errorMessage = `Login failed: ${response.statusText || errorMessage}`;
                        }

                        setStore({
                            message: errorMessage,
                            isLoading: false
                        });
                        return false;
                    }

                    // Parse the response JSON
                    const data = await response.json();

                    // Save token to sessionStorage
                    sessionStorage.setItem("token", data.token);

                    // Update store
                    setStore({
                        user: data.user,
                        isAuthenticated: true,
                        message: data.message || "Login successful!",
                        isLoading: false
                    });

                    return true;
                } catch (error) {
                    console.error("Login error:", error);
                    setStore({
                        message: "Network error. Please check your connection and try again.",
                        isLoading: false
                    });
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