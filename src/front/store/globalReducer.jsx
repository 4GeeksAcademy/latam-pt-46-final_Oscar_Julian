import { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
export const GlobalContext = createContext();

// Función auxiliar para manejar URLs en GitHub Codespaces
const getCorrectBackendUrl = () => {
    // Para entornos de desarrollo de GitHub Codespaces, usamos una URL fija
    if (typeof window !== 'undefined' && window.location.href.includes('github.dev')) {
        // Obtener el nombre del entorno desde la URL actual
        const urlParts = window.location.hostname.split('-');
        const envName = urlParts[0] + '-' + urlParts[1];
        const port = '3001'; // Puerto del backend

        // Construir una URL correcta para GitHub Codespaces
        return `https://${envName}-${port}.app.github.dev`;
    }

    // Para entornos normales, usar la URL configurada
    return import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
};

// Estado inicial de la aplicación
const initialState = {
    user: null,
    isAuthenticated: false,
    apiUrl: getCorrectBackendUrl(), // Usamos nuestra función auxiliar aquí
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
    SET_HELLO: 'set_hello', // Para el mensaje de bienvenida/ejemplo
    SET_API_URL: 'set_api_url' // Para actualizar la URL de la API si es necesario
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
        case ACTIONS.SET_API_URL:
            return { ...state, apiUrl: action.payload };
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

// Proveedor que envuelve la aplicación
export const GlobalProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    // Log de la URL que estamos usando
    useEffect(() => {
        console.log("Current API URL:", store.apiUrl);
    }, [store.apiUrl]);

    // Verificar token al cargar el proveedor
    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    console.log(`Validating token with URL: ${store.apiUrl}/api/user`);
                    const response = await fetch(`${store.apiUrl}/api/user`, {
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
                console.log(`Sending signup request to: ${store.apiUrl}/api/signup`);

                const response = await fetch(`${store.apiUrl}/api/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                console.log("Signup response status:", response.status);

                if (!response.ok) {
                    let errorMessage = "Signup failed";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (jsonError) {
                        errorMessage = `Signup failed: ${response.statusText || errorMessage}`;
                    }

                    console.error("Signup error:", errorMessage);
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
                console.error("Signup network error:", error);
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
                console.log(`Sending login request to: ${store.apiUrl}/api/login`);

                const response = await fetch(`${store.apiUrl}/api/login`, {
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

            if (!token) {
                dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
                dispatch({ type: ACTIONS.SET_USER, payload: null });
                return;
            }

            try {
                console.log(`Validating token with: ${store.apiUrl}/api/user`);
                const response = await fetch(`${store.apiUrl}/api/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    // Token inválido
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
        },

        // Añadir una acción para actualizar manualmente la URL de la API si es necesario
        updateApiUrl: (newUrl) => {
            dispatch({ type: ACTIONS.SET_API_URL, payload: newUrl });
        }
    };

    return (
        <GlobalContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </GlobalContext.Provider>
    );
};