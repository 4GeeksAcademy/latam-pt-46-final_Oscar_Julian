import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { BookCard } from "../component/BookCard";
import { Pagination } from "../component/Pagination";
import { FilterBar } from "../component/FilterBar";
import { MessageAlert } from "../component/MessageAlert";

export const Welcome = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    // Estados para el modal de detalles
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookDetails, setBookDetails] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    // Verificar autenticación y cargar datos
    useEffect(() => {
        const checkAuth = async () => {
            await actions.validateToken();
            setLoading(false);
        };

        const loadData = async () => {
            if (store.user) {
                await actions.getFavorites();
                await actions.getPersonalBooks();
            }
        };
        
        loadData();
        checkAuth();
    }, []);

    // Función para agregar un libro a la biblioteca personal
    const addToPersonalLibrary = async (book, e) => {
        e.stopPropagation();
        
        try {
            // Verificar si ya existe en libros personales
            const existingBook = store.personalBooks.find(
                pb => pb.explore_book_id === book.id
            );
            
            if (existingBook) {
                actions.setMessage("Este libro ya está en tu biblioteca");
                return;
            }
            
            // Crear el libro personal
            const bookData = {
                title: book.title,
                author_name: book.author,
                genre: book.genre,
                category: book.category,
                cover_image: book.coverImage,
                explore_book_id: book.id
            };
            
            const success = await actions.createPersonalBook(bookData);
            if (success) {
                actions.setMessage("Libro agregado a tu biblioteca exitosamente");
            } else {
                actions.setMessage("No se pudo agregar el libro a tu biblioteca");
            }
            
        } catch (error) {
            actions.setMessage("Error: " + error.message);
        }
    };

    // Cargar libros cuando el componente se monta
    useEffect(() => {
        if (!loading && store.isAuthenticated) {
            actions.getBooks(1);
        }
    }, [loading, store.isAuthenticated]);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!loading && !store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, loading, navigate]);

    // Cargar libros cuando cambia la página o los filtros
    useEffect(() => {
        if (store.isAuthenticated) {
            actions.getBooks(store.currentPage, store.filters);
        }
    }, [store.currentPage, store.filters, store.isAuthenticated]);

    // Función para obtener detalles completos del libro
    const fetchBookDetails = async (bookId) => {
        setDetailLoading(true);
        try {
            const response = await fetch(`${store.apiUrl}/api/explore-books/${bookId}`, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            if (!response.ok) throw new Error('Error al obtener detalles');
            const data = await response.json();
            setBookDetails(data);
        } catch (error) {
            actions.setMessage("Error al cargar detalles: " + error.message);
        } finally {
            setDetailLoading(false);
        }
    };

    // Manejar click en la tarjeta
    const handleBookClick = async (book) => {
        setSelectedBook(book);
        await fetchBookDetails(book.id);
        setShowDetailModal(true);
    };

    // Filtrar libros localmente según los filtros aplicados
    const getFilteredBooks = () => {
        if (!store.books || store.books.length === 0) return [];

        return store.books.filter(book => {
            // Aplicar filtro de autor si existe
            if (store.filters.author && book.author !== store.filters.author) {
                return false;
            }

            // Aplicar filtro de género si existe
            if (store.filters.genre && book.genre !== store.filters.genre) {
                return false;
            }

            // Aplicar filtro de categoría si existe
            if (store.filters.category && book.category !== store.filters.category) {
                return false;
            }

            return true;
        });
    };

    // Mostrar estado de carga
    if (loading) {
        return (
            <div className="loading-indicator">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // No mostrar nada si no está autenticado (la redirección se hará en el useEffect)
    if (!store.isAuthenticated) {
        return null;
    }

    // Obtener libros filtrados
    const filteredBooks = getFilteredBooks();

    return (
        <div className="book-library-container">
            <div className="container">
                {/* Cabecera de la biblioteca */}
                <div className="library-header">
                    <h1 className="library-heading">
                        <i className="fa-solid fa-book-open me-2"></i>
                        Biblioteca Digital
                    </h1>
                    <p className="lead text-white-50">
                        Explora nuestra colección de libros digitales de dominio público
                    </p>
                    <div className="library-stats">
                        <div className="stat-item">
                            <i className="fa-solid fa-book"></i>
                            <span>Total: {store.totalBooks} libros</span>
                        </div>
                        <div className="stat-item">
                            <i className="fa-solid fa-bookmark"></i>
                            <span>Página: {store.currentPage}</span>
                        </div>
                    </div>
                </div>

                {/* Barra de filtros */}
                <FilterBar />

                {/* Área principal de libros */}
                {store.isLoading ? (
                    <div className="loading-indicator">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando libros...</span>
                        </div>
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <>
                        <div className="books-grid">
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="book-appear"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <BookCard 
                                        book={book} 
                                        onViewDetails={() => handleBookClick(book)}
                                        onAddToLibrary={(e) => addToPersonalLibrary(book, e)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <Pagination />
                    </>
                ) : (
                    <div className="empty-library">
                        <i className="fa-solid fa-face-frown"></i>
                        <h3>No se encontraron libros</h3>
                        <p>
                            No hay libros que coincidan con tus criterios de búsqueda o filtros.
                            Intenta ajustar tus filtros o realizar una búsqueda diferente.
                        </p>
                        <button
                            className="btn btn-outline-light mt-3"
                            onClick={() => actions.getBooks(1, {})}
                        >
                            <i className="fa-solid fa-sync me-2"></i>
                            Reiniciar búsqueda
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Detalles del Libro */}
            {showDetailModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="fa-solid fa-circle-info me-2"></i>
                                    Detalles Completos
                                </h5>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-light rounded-circle"
                                    onClick={() => setShowDetailModal(false)}
                                    style={{ width: "32px", height: "32px" }}
                                >
                                    <span style={{ fontSize: "1.2rem" }}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {detailLoading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                ) : bookDetails ? (
                                    <div className="row">
                                        <div className="col-md-4 text-center">
                                            <img
                                                src={bookDetails.cover_image || '/default-book-cover.jpg'}
                                                alt={`Portada de ${bookDetails.title}`}
                                                className="img-fluid rounded shadow mb-3"
                                                style={{ maxHeight: '300px' }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <h3 className="mb-3">{bookDetails.title}</h3>
                                            <div className="details-section">
                                                <div className="detail-item text-dark">
                                                    <i className="fa-solid fa-user-pen text-primary me-2"></i>
                                                    <strong className="text-dark">Autor:</strong> {bookDetails.author_name}
                                                </div>
                                                <div className="detail-item text-dark">
                                                    <i className="fa-solid fa-tag text-primary me-2"></i>
                                                    <strong className="text-dark">Género:</strong> {bookDetails.genre || 'No especificado'}
                                                </div>
                                                <div className="detail-item text-dark">
                                                    <i className="fa-solid fa-list text-primary me-2"></i>
                                                    <strong className="text-dark">Categoría:</strong> {bookDetails.category || 'No especificada'}
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="text-primary">
                                                        <i className="fa-solid fa-file-lines me-2"></i>
                                                        Resumen
                                                    </h5>
                                                    <p className="text-dark">
                                                        {bookDetails.summary || 'Este libro no tiene resumen.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-danger">
                                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                        No se pudieron cargar los detalles
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    <i className="fa-solid fa-xmark me-2"></i>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay oscuro para el modal */}
            {showDetailModal && <div className="modal-backdrop fade show"></div>}

            {/* Componente de mensaje */}
            <MessageAlert />
        </div>
    );
};