import { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
export const GlobalContext = createContext();

// Estado inicial de la aplicación
const initialState = {
    user: null,
    isAuthenticated: false,
    // Fix: Ensure apiUrl doesn't have trailing slashes and is properly formed
    apiUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
    message: null,
    isLoading: false
};

// Tipos de acciones
export const ACTIONS = {
    SET_USER: 'set_user',
    SET_AUTHENTICATED: 'set_authenticated',
    SET_MESSAGE: 'set_message',
    CLEAR_MESSAGE: 'clear_message',
    SET_LOADING: 'set_loading',
    LOGOUT: 'logout',
    SET_HELLO: 'set_hello' // Para el mensaje de bienvenida/ejemplo
};

// Reducer para manejar las acciones
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return { ...state, user: action.payload };
        case ACTIONS.SET_AUTHENTICATED:
            return { ...state, isAuthenticated: action.payload };
        case ACTIONS.SET_MESSAGE:
            return { ...state, message: action.payload };
        case ACTIONS.CLEAR_MESSAGE:
            return { ...state, message: null };
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case ACTIONS.LOGOUT:
            return { ...state, user: null, isAuthenticated: false, message: "Logged out successfully" };
        case ACTIONS.SET_HELLO:
            return { ...state, hello: action.payload };
        default:
            return state;
    }
}

// Hook personalizado para usar el reducer global
export const useGlobalReducer = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalReducer debe ser usado dentro de un GlobalProvider');
    }
    return context;
};

// Debug function to help with URL issues
const logApiCall = (endpoint, url) => {
    console.log(`API call to ${endpoint}:`, url);
    return url;
};

// Proveedor que envuelve la aplicación
export const GlobalProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    // For debugging - log the API URL on load
    useEffect(() => {
        console.log("Current API URL:", store.apiUrl);
    }, [store.apiUrl]);

    // Verificar token al cargar el proveedor
    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem("token");
            console.log(token);
            
            if (token) {
                try {
                    const apiUrl = `https://super-space-system-pjgpx5rq9g6r36vg7-3001.app.github.dev/api/user`;
                    console.log("Validating token using URL:", apiUrl);

                    const response = await fetch(apiUrl, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        dispatch({ type: ACTIONS.SET_USER, payload: userData });
                        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
                    } else {
                        // Token inválido o expirado
                        console.log("Token validation failed:", response.status);
                        sessionStorage.removeItem("token");
                    }
                } catch (error) {
                    console.error("Error validating token on load:", error);
                    sessionStorage.removeItem("token");
                }
            }
        };

        checkToken();
    }, []);

    // Funciones de acción que serán utilizadas en los componentes
    const actions = {
        signup: async (email, password) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `https://super-space-system-pjgpx5rq9g6r36vg7-3001.app.github.dev/api/signup`;
                console.log("Signup request to:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    let errorMessage = "Signup failed";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (jsonError) {
                        errorMessage = `Signup failed: ${response.statusText || errorMessage}`;
                    }

                    dispatch({ type: ACTIONS.SET_MESSAGE, payload: errorMessage });
                    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                    return false;
                }

                try {
                    const data = await response.json();
                    dispatch({
                        type: ACTIONS.SET_MESSAGE,
                        payload: data.message || "Signup successful! Please login."
                    });
                    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                    return true;
                } catch (jsonError) {
                    dispatch({
                        type: ACTIONS.SET_MESSAGE,
                        payload: "Signup successful! Please login."
                    });
                    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                    return true;
                }
            } catch (error) {
                console.error("Signup error:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Network error. Please check your connection and try again."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        login: async (email, password) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `https://super-space-system-pjgpx5rq9g6r36vg7-3001.app.github.dev/api/login`;
                console.log("Login request to:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    let errorMessage = "Login failed";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (jsonError) {
                        errorMessage = `Login failed: ${response.statusText || errorMessage}`;
                    }

                    dispatch({ type: ACTIONS.SET_MESSAGE, payload: errorMessage });
                    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                    return false;
                }

                const data = await response.json();
                
                // Guardar token en sessionStorage
                sessionStorage.setItem("token", data.token);
                console.log(sessionStorage.getItem("token"));

                // Actualizar estado
                dispatch({ type: ACTIONS.SET_USER, payload: data.user });
                dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: data.message || "Login successful!"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                console.error("Login error:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Network error. Please check your connection and try again."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        logout: () => {
            // Eliminar token del sessionStorage
            sessionStorage.removeItem("token");

            // Actualizar estado
            dispatch({ type: ACTIONS.LOGOUT });
        },

        validateToken: async () => {
            const token = sessionStorage.getItem("token");
            console.log(token);
            
            if (!token) {
                dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
                dispatch({ type: ACTIONS.SET_USER, payload: null });
                return;
            }

            try {
                const apiUrl = `https://super-space-system-pjgpx5rq9g6r36vg7-3001.app.github.dev/api/user`;
                console.log("Validating token using URL:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    // Token inválido
                    console.log("Token validation failed:", response.status);
                    sessionStorage.removeItem("token");
                    dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
                    dispatch({ type: ACTIONS.SET_USER, payload: null });
                    return;
                }

                const userData = await response.json();
                dispatch({ type: ACTIONS.SET_USER, payload: userData });
                dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
            } catch (error) {
                console.error("Token validation error:", error);
                sessionStorage.removeItem("token");
                dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
                dispatch({ type: ACTIONS.SET_USER, payload: null });
            }
        },

        clearMessage: () => {
            dispatch({ type: ACTIONS.CLEAR_MESSAGE });
        }
    };

    return (
        <GlobalContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </GlobalContext.Provider>
    );
};