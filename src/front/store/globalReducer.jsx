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
    isLoading: false,
    // Nuevos estados para los libros
    books: [],
    totalBooks: 0,
    currentPage: 1,
    booksPerPage: 7,
    filters: {
        search: "",
        author: "",
        genre: "",
        category: ""
    }
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

    // Nuevas acciones para los libros
    SET_BOOKS: 'set_books',
    SET_TOTAL_BOOKS: 'set_total_books',
    SET_CURRENT_PAGE: 'set_current_page',
    SET_BOOKS_PER_PAGE: 'set_books_per_page',
    SET_FILTERS: 'set_filters',
    CLEAR_FILTERS: 'clear_filters'
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

        // Nuevos cases para los libros
        case ACTIONS.SET_BOOKS:
            return { ...state, books: action.payload };
        case ACTIONS.SET_TOTAL_BOOKS:
            return { ...state, totalBooks: action.payload };
        case ACTIONS.SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case ACTIONS.SET_BOOKS_PER_PAGE:
            return { ...state, booksPerPage: action.payload };
        case ACTIONS.SET_FILTERS:
            return {
                ...state,
                filters: { ...state.filters, ...action.payload }
            };
        case ACTIONS.CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    search: "",
                    author: "",
                    genre: "",
                    category: ""
                }
            };
        default:
            return state;
    }
}

// Hook personalizado para usar el reducer global
// Asegúrate de que esta función está exportada correctamente
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
                    const apiUrl = `${store.apiUrl}/api/user`;
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
                const apiUrl = `${store.apiUrl}/api/signup`;
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
                const apiUrl = `${store.apiUrl}/api/login`;

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
                const apiUrl = `${store.apiUrl}/api/user`;

                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
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
                sessionStorage.removeItem("token");
                dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
                dispatch({ type: ACTIONS.SET_USER, payload: null });
            }
        },

        clearMessage: () => {
            dispatch({ type: ACTIONS.CLEAR_MESSAGE });
        },

        // Nueva función para obtener libros
        getBooks: async (page = 1, filters = {}) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                // Construir la URL con parámetros de paginación
                let apiUrl = `https://gutendex.com/books?page=${page}`;

                // Añadir filtros de búsqueda si existen
                if (filters.search) {
                    apiUrl += `&search=${encodeURIComponent(filters.search)}`;
                }

                console.log("Fetching books from:", apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Error fetching books');
                }

                const data = await response.json();

                // Procesar los datos para extraer solo la información necesaria
                const processedBooks = data.results.map(book => ({
                    id: book.id,
                    title: book.title,
                    author: book.authors.length > 0 ? book.authors[0].name : 'Unknown Author',
                    coverImage: book.formats['image/jpeg'] || '',
                    genre: book.subjects && book.subjects.length > 0 ? book.subjects[0] : 'Uncategorized',
                    category: book.bookshelves && book.bookshelves.length > 0 ? book.bookshelves[0] : 'Uncategorized'
                }));

                dispatch({ type: ACTIONS.SET_BOOKS, payload: processedBooks });
                dispatch({ type: ACTIONS.SET_TOTAL_BOOKS, payload: data.count });
                dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return processedBooks;
            } catch (error) {
                console.error("Error fetching books:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Error loading books. Please try again later."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return [];
            }
        },

        setFilters: (filters) => {
            dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
        },

        clearFilters: () => {
            dispatch({ type: ACTIONS.CLEAR_FILTERS });
        },

        changePage: (page) => {
            dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
        }
    };

    return (
        <GlobalContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </GlobalContext.Provider>
    );
};