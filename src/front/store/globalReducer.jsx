import { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
export const GlobalContext = createContext();

// Estado inicial de la aplicación
const initialState = {
    user: null,
    isAuthenticated: false,
    // Ensure apiUrl doesn't have trailing slashes and is properly formed
    apiUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
    message: null,
    isLoading: false,
    // Estados para los libros de exploración
    books: [],
    totalBooks: 0,
    // Estados para libros personales
    personalBooks: [],
    totalPersonalBooks: 0,
    // Estados compartidos
    currentPage: 1,
    booksPerPage: 100,
    filters: {
        search: "",
        author: "",
        genre: "",
        category: ""
    },
    isSeeding: false,
    seedingProgress: 0,
    otherUsersBooks: [],
    totalOtherUsersBooks: 0,
    // Estados para reviews
    reviews: [],
    currentBookReviews: [],
    favorites: []
};

// Tipos de acciones
export const ACTIONS = {
    SET_USER: 'set_user',
    SET_AUTHENTICATED: 'set_authenticated',
    SET_MESSAGE: 'set_message',
    CLEAR_MESSAGE: 'clear_message',
    SET_LOADING: 'set_loading',
    LOGOUT: 'logout',
    SET_HELLO: 'set_hello',

    // Acciones para los libros de exploración
    SET_BOOKS: 'set_books',
    SET_TOTAL_BOOKS: 'set_total_books',
    SET_CURRENT_PAGE: 'set_current_page',
    SET_BOOKS_PER_PAGE: 'set_books_per_page',
    SET_FILTERS: 'set_filters',
    CLEAR_FILTERS: 'clear_filters',

    // Acciones para libros personales
    SET_PERSONAL_BOOKS: 'set_personal_books',
    SET_TOTAL_PERSONAL_BOOKS: 'set_total_personal_books',
    ADD_PERSONAL_BOOK: 'add_personal_book',
    UPDATE_PERSONAL_BOOK: 'update_personal_book',
    REMOVE_PERSONAL_BOOK: 'remove_personal_book',

    // Siembra de libros
    SEED_BOOKS: 'seed_books',
    SET_SEEDING_PROGRESS: 'set_seeding_progress',

    SET_OTHER_USERS_BOOKS: 'set_other_users_books',
    SET_TOTAL_OTHER_USERS_BOOKS: 'set_total_other_users_books',

    // Acciones para reviews
    SET_REVIEWS: 'set_reviews',
    SET_CURRENT_BOOK_REVIEWS: 'set_current_book_reviews',
    ADD_REVIEW: 'add_review',
    UPDATE_REVIEW: 'update_review',
    REMOVE_REVIEW: 'remove_review',

    SET_FAVORITES: 'set_favorites',
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

        // Cases para los libros de exploración
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

        // Cases para libros personales
        case ACTIONS.SET_PERSONAL_BOOKS:
            return { ...state, personalBooks: action.payload };
        case ACTIONS.SET_TOTAL_PERSONAL_BOOKS:
            return { ...state, totalPersonalBooks: action.payload };
        case ACTIONS.ADD_PERSONAL_BOOK:
            return {
                ...state,
                personalBooks: [...state.personalBooks, action.payload],
                totalPersonalBooks: state.totalPersonalBooks + 1
            };
        case ACTIONS.UPDATE_PERSONAL_BOOK:
            return {
                ...state,
                personalBooks: state.personalBooks.map(book =>
                    book.id === action.payload.id ? action.payload : book
                )
            };
        case ACTIONS.REMOVE_PERSONAL_BOOK:
            return {
                ...state,
                personalBooks: state.personalBooks.filter(book => book.id !== action.payload),
                totalPersonalBooks: state.totalPersonalBooks - 1
            };

        case ACTIONS.SET_OTHER_USERS_BOOKS:
            return { ...state, otherUsersBooks: action.payload };
        case ACTIONS.SET_TOTAL_OTHER_USERS_BOOKS:
            return { ...state, totalOtherUsersBooks: action.payload };

        // Cases para reviews
        case ACTIONS.SET_REVIEWS:
            return { ...state, reviews: action.payload };
        case ACTIONS.SET_CURRENT_BOOK_REVIEWS:
            return { ...state, currentBookReviews: action.payload };
        case ACTIONS.ADD_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
                currentBookReviews: [...state.currentBookReviews, action.payload]
            };
        case ACTIONS.UPDATE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.map(review =>
                    review.id === action.payload.id ? action.payload : review
                ),
                currentBookReviews: state.currentBookReviews.map(review =>
                    review.id === action.payload.id ? action.payload : review
                )
            };
        case ACTIONS.REMOVE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.payload),
                currentBookReviews: state.currentBookReviews.filter(review => review.id !== action.payload)
            };

        // Siembra de Libros
        case ACTIONS.SEED_BOOKS:
            return { ...state, isSeeding: action.payload };
        case ACTIONS.SET_SEEDING_PROGRESS:
            return { ...state, seedingProgress: action.payload };
        // Favoritos
        case ACTIONS.SET_FAVORITES:
            return { ...state, favorites: action.payload };
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

    // For debugging - log the API URL on load
    useEffect(() => {
        // console.log("Current API URL:", store.apiUrl);
    }, [store.apiUrl]);

    // Verificar token al cargar el proveedor
    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem("token");

            if (token) {
                try {
                    const apiUrl = `${store.apiUrl}/api/user`;
                    // console.log("Validating token using URL:", apiUrl);

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
                        sessionStorage.removeItem("token");
                    }
                } catch (error) {
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
                // console.log("Signup request to:", apiUrl);

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
                // console.error("Signup error:", error);
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

        // Función para obtener libros de exploración
        getBooks: async (page = 1, filters = {}) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                // Construir la URL local con filtros (si aplican)
                let apiUrl = `${store.apiUrl}/api/explore-books`;

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching books from local API');
                }

                const result = await response.json();
                const data = result.data || [];

                // Filtrar por búsqueda en el cliente (ya que tu API no implementa filtros aún)
                let filteredBooks = data;
                if (filters.search) {
                    const query = filters.search.toLowerCase();
                    filteredBooks = data.filter(book =>
                        book.title.toLowerCase().includes(query) ||
                        book.author_name.toLowerCase().includes(query)
                    );
                }

                // Paginación manual en el cliente
                const booksPerPage = 100;
                const startIndex = (page - 1) * booksPerPage;
                const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

                // Adaptar formato de cada libro (si es necesario)
                const processedBooks = paginatedBooks.map(book => ({
                    id: book.id,
                    title: book.title,
                    author: book.author_name,
                    coverImage: book.cover_image,
                    genre: book.genre || 'Uncategorized',
                    category: book.category || 'Uncategorized'
                }));

                dispatch({ type: ACTIONS.SET_BOOKS, payload: processedBooks });
                dispatch({ type: ACTIONS.SET_TOTAL_BOOKS, payload: filteredBooks.length });
                dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return processedBooks;
            } catch (error) {
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Error loading books. Please try again later."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return [];
            }
        },

        // Obtener libros personales
        getPersonalBooks: async (page = 1, filters = {}) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                // Construir parámetros de consulta para paginación y filtros
                const queryParams = new URLSearchParams();
                if (page) queryParams.append('page', page);
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) queryParams.append(key, value);
                });

                const apiUrl = `${store.apiUrl}/api/personal-books?${queryParams.toString()}`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching personal books');
                }

                const data = await response.json();

                dispatch({ type: ACTIONS.SET_PERSONAL_BOOKS, payload: data.data || [] });
                dispatch({ type: ACTIONS.SET_TOTAL_PERSONAL_BOOKS, payload: data.count || 0 });
                dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return data.data || [];
            } catch (error) {
                // console.error("Error fetching personal books:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Error al cargar tus libros. Por favor, intenta más tarde."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return [];
            }
        },

        // Crear un libro personal
        createPersonalBook: async (bookData) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/personal-books`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error creating book");
                }

                const data = await response.json();

                dispatch({ type: ACTIONS.ADD_PERSONAL_BOOK, payload: data.book });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Libro creado exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error creating personal book:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al crear el libro: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        // Actualizar un libro personal
        updatePersonalBook: async (bookData) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/personal-books/${bookData.id}`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error updating book");
                }

                const data = await response.json();

                dispatch({ type: ACTIONS.UPDATE_PERSONAL_BOOK, payload: data.book });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Libro actualizado exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error updating personal book:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al actualizar el libro: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        // Eliminar un libro personal
        deletePersonalBook: async (bookId) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/personal-books/${bookId}`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error deleting book");
                }

                dispatch({ type: ACTIONS.REMOVE_PERSONAL_BOOK, payload: bookId });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Libro eliminado exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error deleting personal book:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al eliminar el libro: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
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
        },

        // Función para establecer un mensaje
        setMessage: (message) => {
            dispatch({ type: ACTIONS.SET_MESSAGE, payload: message });

            // Limpiar el mensaje después de 5 segundos
            setTimeout(() => {
                dispatch({ type: ACTIONS.CLEAR_MESSAGE });
            }, 5000);
        },

        // Añadir esta nueva acción
        getOtherUsersBooks: async () => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/other-users-books`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching other users books');
                }

                const data = await response.json();

                dispatch({ type: ACTIONS.SET_OTHER_USERS_BOOKS, payload: data.data || [] });
                dispatch({ type: ACTIONS.SET_TOTAL_OTHER_USERS_BOOKS, payload: data.count || 0 });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return data.data || [];
            } catch (error) {
                // console.error("Error fetching other users books:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Error al cargar los libros de otros usuarios. Por favor, intenta más tarde."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return [];
            }
        },

        // Modificar getPersonalBooks para que solo obtenga los libros del usuario actual
        // getPersonalBooks: async (page = 1, filters = {}) => {
        //     dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        //     try {
        //         const current_user_id = store.user ? store.user.id : null;
        //         if (!current_user_id) {
        //             throw new Error('User not authenticated');
        //         }

        //         // Construir parámetros de consulta para paginación y filtros
        //         const queryParams = new URLSearchParams();
        //         if (page) queryParams.append('page', page);
        //         Object.entries(filters).forEach(([key, value]) => {
        //             if (value) queryParams.append(key, value);
        //         });

        //         const apiUrl = `${store.apiUrl}/api/personal-books?${queryParams.toString()}`;
        //         const token = sessionStorage.getItem("token");

        //         const response = await fetch(apiUrl, {
        //             method: "GET",
        //             headers: {
        //                 "Authorization": `Bearer ${token}`
        //             }
        //         });

        //         if (!response.ok) {
        //             throw new Error('Error fetching personal books');
        //         }

        //         const data = await response.json();

        //         // Filtrar para mostrar solo los libros del usuario actual
        //         const userBooks = data.data ? data.data.filter(book => book.created_by === current_user_id) : [];

        //         dispatch({ type: ACTIONS.SET_PERSONAL_BOOKS, payload: userBooks });
        //         dispatch({ type: ACTIONS.SET_TOTAL_PERSONAL_BOOKS, payload: userBooks.length });
        //         dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
        //         dispatch({ type: ACTIONS.SET_LOADING, payload: false });

        //         return userBooks;
        //     } catch (error) {
        //         // console.error("Error fetching personal books:", error);
        //         dispatch({
        //             type: ACTIONS.SET_MESSAGE,
        //             payload: "Error al cargar tus libros. Por favor, intenta más tarde."
        //         });
        //         dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        //         return [];
        //     }
        // },

        // Siembra de Libros
        seedBooks: async () => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.SEED_BOOKS, payload: true });

            try {
                const totalPages = 1;
                let booksSeeded = 0;

                for (let page = 1; page <= totalPages; page++) {
                    const gutendexUrl = `https://gutendex.com/books?page=${page}`;
                    const response = await fetch(gutendexUrl);
                    const data = await response.json();

                    for (const book of data.results) {
                        const processedBook = {
                            title: book.title,
                            author_name: book.authors?.[0]?.name || 'Unknown Author',
                            genre: book.subjects?.[0] || 'General',
                            category: book.bookshelves?.[0] || 'Uncategorized',
                            cover_image: book.formats?.['image/jpeg'] || '',
                            summary: book.summaries?.[0] || '',
                            created_by: 1,
                            created_date: new Date().toISOString().split('T')[0]
                        };

                        await fetch(`${store.apiUrl}/api/explore-books`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                            },
                            body: JSON.stringify(processedBook)
                        });

                        booksSeeded++;
                        const progress = Math.round((booksSeeded / (totalPages * 32)) * 100);
                        dispatch({ type: ACTIONS.SET_SEEDING_PROGRESS, payload: progress });
                    }
                }

                dispatch({ type: ACTIONS.SET_MESSAGE, payload: '¡Base de datos poblada exitosamente!' });
            } catch (error) {
                dispatch({ type: ACTIONS.SET_MESSAGE, payload: 'Error al poblar la base de datos' });
            } finally {
                dispatch({ type: ACTIONS.SEED_BOOKS, payload: false });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
            }
        },

        // ====== FUNCIONES PARA FAVORITOS ======

        // Agregar a explore-books favoritos
        addExploreFavorite: async (exploreBookId) => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/favorites/explore`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ explore_book_id: exploreBookId })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al agregar a favoritos');
                }

                const newFavorite = await response.json();

                // Actualizar lista de favoritos
                await actions.getFavorites();

                return newFavorite;
            } catch (error) {
                actions.setMessage(error.message);
                return false;
            }
        },

        // Agregar libro personal a favoritos
        addPersonalFavorite: async (personalBookId) => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/favorites/personal`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ personal_book_id: personalBookId })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al agregar a favoritos');
                }

                const newFavorite = await response.json();

                // Actualizar lista de favoritos
                await actions.getFavorites();

                return newFavorite;
            } catch (error) {
                actions.setMessage(error.message);
                return false;
            }
        },

        // Obtener todos los Favoritos
        getFavorites: async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/favorites`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Error al obtener favoritos');

                const data = await response.json();
                dispatch({ type: ACTIONS.SET_FAVORITES, payload: data.favorites || [] });

                return {
                    success: data.success,
                    count: data.count,
                    favorites: data.favorites || []
                };
            } catch (error) {
                // console.error("Error fetching favorites:", error);
                dispatch({ type: ACTIONS.SET_FAVORITES, payload: [] });
                return {
                    success: false,
                    count: 0,
                    favorites: []
                };
            }
        },

        // Eliminar favorito
        removeFavorite: async (favoriteId) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/favorites/${favoriteId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al eliminar de favoritos');
                }

                // Actualizar lista de favoritos después de eliminar
                const updatedFavorites = store.favorites.filter(fav => fav.id !== favoriteId);
                dispatch({ type: ACTIONS.SET_FAVORITES, payload: updatedFavorites });

                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Eliminado de favoritos exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error removing favorite:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al eliminar de favoritos: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        // Verificar si un libro está en favoritos
        isFavorite: (bookId, bookType) => {
            if (!store.favorites || store.favorites.length === 0) return false;

            return store.favorites.some(fav => {
                if (bookType === 'explore') {
                    return fav.book_type === 'explore' && fav.explore_book_id === bookId;
                } else {
                    return fav.book_type === 'personal' && fav.personal_book_id === bookId;
                }
            });
        },

        // Función helper para crear libro personal desde explorar
        createPersonalBookFromExplore: async (bookData) => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/personal-books`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al crear libro personal');
                }

                const newBook = await response.json();

                // Actualizar lista de libros personales
                dispatch({ type: ACTIONS.ADD_PERSONAL_BOOK, payload: newBook.book });

                return newBook.book;
            } catch (error) {
                actions.setMessage(error.message);
                return false;
            }
        },

        // ====== FUNCIONES PARA REVIEWS ======

        // Obtener reviews de un libro específico
        getBookReviews: async (bookId) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/personal-books/${bookId}/reviews`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching reviews');
                }

                const reviews = await response.json();
                dispatch({ type: ACTIONS.SET_CURRENT_BOOK_REVIEWS, payload: reviews });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return reviews;
            } catch (error) {
                // console.error("Error fetching book reviews:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Error al cargar las reviews. Por favor, intenta más tarde."
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return [];
            }
        },

        // Crear una nueva review
        createReview: async (reviewData) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/reviews`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(reviewData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error creating review");
                }

                const newReview = await response.json();
                dispatch({ type: ACTIONS.ADD_REVIEW, payload: newReview });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Review creada exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error creating review:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al crear la review: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        // Actualizar una review existente
        updateReview: async (reviewId, reviewData) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/reviews/${reviewId}`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(reviewData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error updating review");
                }

                const updatedReview = await response.json();
                dispatch({ type: ACTIONS.UPDATE_REVIEW, payload: updatedReview });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Review actualizada exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error updating review:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al actualizar la review: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        // Eliminar una review
        deleteReview: async (reviewId) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                const apiUrl = `${store.apiUrl}/api/reviews/${reviewId}`;
                const token = sessionStorage.getItem("token");

                const response = await fetch(apiUrl, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error deleting review");
                }

                dispatch({ type: ACTIONS.REMOVE_REVIEW, payload: reviewId });
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: "Review eliminada exitosamente"
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });

                return true;
            } catch (error) {
                // console.error("Error deleting review:", error);
                dispatch({
                    type: ACTIONS.SET_MESSAGE,
                    payload: `Error al eliminar la review: ${error.message}`
                });
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
                return false;
            }
        },

        createPersonalBookFromExplore: async (bookData) => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/personal-books`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) throw new Error('Error al crear libro personal');
                return true;
            } catch (error) {
                actions.setMessage(error.message);
                return false;
            }
        },

        // Agregar a explore-boks
        addExploreFavorite: async (exploreBookId) => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/favorites/explore`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ explore_book_id: exploreBookId })
                });

                if (!response.ok) throw new Error('Error al agregar a favoritos');
                return true;
            } catch (error) {
                actions.setMessage(error.message);
                return false;
            }
        },

        // Obtener todos los Favoritos
        getFavorites: async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch(`${store.apiUrl}/api/favorites`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Error al obtener favoritos');

                const data = await response.json();
                dispatch({ type: ACTIONS.SET_FAVORITES, payload: data.favorites });
                return {
                    success: data.success,
                    count: data.count,
                    favorites: data.favorites
                };
            } catch (error) {
                actions.setMessage(error.message);
                return {
                    success: false,
                    count: 0,
                    favorites: []
                };
            }
        },
    };

    return (
        <GlobalContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </GlobalContext.Provider>
    );
};