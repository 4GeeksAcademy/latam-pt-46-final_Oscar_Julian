import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Favorites = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookDetails, setBookDetails] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    // Verificar autenticación y cargar favoritos
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            await actions.validateToken();
            if (store.isAuthenticated) {
                await actions.getFavorites();
            }
            setLoading(false);
        };

        checkAuthAndLoadData();
    }, []);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!loading && !store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, loading, navigate]);

    // Función para eliminar favorito
    const handleRemoveFavorite = async (favoriteId) => {
        const success = await actions.removeFavorite(favoriteId);
        if (success) {
            // Recargar favoritos después de eliminar
            await actions.getFavorites();
        }
    };

    // Función para obtener detalles completos del libro
    const fetchBookDetails = async (book, bookType) => {
        setDetailLoading(true);
        try {
            let apiUrl = '';
            if (bookType === 'explore') {
                apiUrl = `${store.apiUrl}/api/explore-books/${book.id}`;
            } else {
                apiUrl = `${store.apiUrl}/api/personal-books/${book.id}`;
            }

            const response = await fetch(apiUrl, {
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
    const handleBookClick = async (favorite) => {
        setSelectedBook(favorite);
        await fetchBookDetails(favorite.book, favorite.book_type);
        setShowDetailModal(true);
    };

    // Función para filtrar favoritos usando solo la búsqueda del SearchBar
    const getFilteredFavorites = () => {
        if (!store.favorites || store.favorites.length === 0) return [];

        return store.favorites.filter(favorite => {
            const book = favorite.book;
            if (!book) return false;

            // Aplicar solo el filtro de búsqueda (del SearchBar del navbar)
            if (store.filters.search) {
                const searchTerm = store.filters.search.toLowerCase();
                const titleMatch = book.title?.toLowerCase().includes(searchTerm);
                const authorMatch = book.author_name?.toLowerCase().includes(searchTerm);
                if (!titleMatch && !authorMatch) {
                    return false;
                }
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

    // No mostrar nada si no está autenticado
    if (!store.isAuthenticated) {
        return null;
    }

    const favorites = store.favorites || [];
    const filteredFavorites = getFilteredFavorites();

    return (
        <div className="book-library-container">
            <div className="container">
                {/* Cabecera de favoritos */}
                <div className="library-header d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="library-heading">
                            <i className="fa-solid fa-heart me-2 text-danger"></i>
                            Mis Favoritos
                        </h1>
                        <p className="lead text-white-50">
                            Todos tus libros favoritos en un solo lugar
                        </p>
                        <div className="library-stats">
                            <div className="stat-item">
                                <i className="fa-solid fa-heart"></i>
                                <span>Total: {favorites.length} favoritos</span>
                            </div>
                            <div className="stat-item">
                                <i className="fa-solid fa-star"></i>
                                <span>Explorar: {favorites.filter(f => f.book_type === 'explore').length}</span>
                            </div>
                            <div className="stat-item">
                                <i className="fa-solid fa-book"></i>
                                <span>Personal: {favorites.filter(f => f.book_type === 'personal').length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <Link to="/welcome" className="btn btn-outline-info btn-lg">
                            <i className="fa-solid fa-compass me-2"></i>
                            Explorar Libros
                        </Link>
                        <Link to="/library" className="btn btn-outline-light btn-lg">
                            <i className="fa-solid fa-book-open me-2"></i>
                            Mi Biblioteca
                        </Link>
                    </div>
                </div>

                {/* Área principal de favoritos */}
                {store.isLoading ? (
                    <div className="loading-indicator">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando favoritos...</span>
                        </div>
                    </div>
                ) : filteredFavorites.length > 0 ? (
                    <div className="books-grid">
                        {filteredFavorites.map((favorite, index) => (
                            <div
                                key={favorite.id}
                                className="book-appear"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <FavoriteCard
                                    favorite={favorite}
                                    onViewDetails={() => handleBookClick(favorite)}
                                    onRemoveFavorite={handleRemoveFavorite}
                                />
                            </div>
                        ))}
                    </div>
                ) : favorites.length > 0 ? (
                    // Hay favoritos pero no coinciden con la búsqueda
                    <div className="empty-library">
                        <i className="fa-solid fa-search text-warning" style={{ fontSize: '4rem' }}></i>
                        <h3>No se encontraron favoritos</h3>
                        <p>
                            No hay favoritos que coincidan con tu búsqueda.
                        </p>
                        <div className="d-flex gap-3 mt-4 justify-content-center">
                            <Link to="/welcome" className="btn btn-primary">
                                <i className="fa-solid fa-search me-2"></i>
                                Explorar Biblioteca
                            </Link>
                        </div>
                    </div>
                ) : (
                    // No hay favoritos en absoluto
                    <div className="empty-library">
                        <i className="fa-solid fa-heart-crack text-danger" style={{ fontSize: '4rem' }}></i>
                        <h3>No tienes favoritos aún</h3>
                        <p>
                            Explora nuestra biblioteca y marca tus libros favoritos para verlos aquí.
                        </p>
                        <div className="d-flex gap-3 mt-4 justify-content-center">
                            <Link to="/welcome" className="btn btn-primary">
                                <i className="fa-solid fa-search me-2"></i>
                                Explorar Biblioteca
                            </Link>
                            <Link to="/library" className="btn btn-outline-primary">
                                <i className="fa-solid fa-plus me-2"></i>
                                Agregar Libro Personal
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Detalles del Libro */}
            {showDetailModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">
                                    <i className="fa-solid fa-heart me-2"></i>
                                    Libro Favorito - {selectedBook?.book_type === 'explore' ? 'Explorar' : 'Personal'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowDetailModal(false)}
                                    aria-label="Close"
                                >
                                </button>
                            </div>
                            <div className="modal-body">
                                {detailLoading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-danger" role="status">
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
                                            <div className="mt-3">
                                                <span className={`badge ${selectedBook?.book_type === 'explore' ? 'bg-info' : 'bg-success'} fs-6`}>
                                                    {selectedBook?.book_type === 'explore' ? 'Biblioteca Digital' : 'Libro Personal'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <h3 className="mb-3">{bookDetails.title}</h3>
                                            <div className="details-section">
                                                <div className="detail-item text-dark">
                                                    <i className="fa-solid fa-user-pen text-danger me-2"></i>
                                                    <strong className="text-dark">Autor:</strong> {bookDetails.author_name}
                                                </div>
                                                <div className="detail-item text-dark">
                                                    <i className="fa-solid fa-tag text-danger me-2"></i>
                                                    <strong className="text-dark">Género:</strong> {bookDetails.genre || 'No especificado'}
                                                </div>
                                                <div className="detail-item text-dark">
                                                    <i className="fa-solid fa-list text-danger me-2"></i>
                                                    <strong className="text-dark">Categoría:</strong> {bookDetails.category || 'No especificada'}
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="text-danger">
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
        </div>
    );
};

// Componente para la tarjeta de favorito
const FavoriteCard = ({ favorite, onViewDetails, onRemoveFavorite }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async (e) => {
        e.stopPropagation();
        setIsRemoving(true);
        await onRemoveFavorite(favorite.id);
        setIsRemoving(false);
    };

    const book = favorite.book;
    if (!book) return null;

    return (
        <div
            className="book-card-container position-relative"
            onClick={onViewDetails}
            style={{ cursor: 'pointer' }}
        >
            <div className="book-card">
                {/* Indicador de tipo de libro */}
                <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 2 }}>
                    <span className={`badge ${favorite.book_type === 'explore' ? 'bg-info' : 'bg-success'}`}>
                        {favorite.book_type === 'explore' ? 'Explorar' : 'Personal'}
                    </span>
                </div>

                {/* Botón para eliminar de favoritos */}
                <div className="position-absolute top-0 start-0 m-2" style={{ zIndex: 2 }}>
                    <button
                        className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center"
                        onClick={handleRemove}
                        disabled={isRemoving}
                        title="Eliminar de favoritos"
                        style={{
                            width: "32px",
                            height: "32px",
                            padding: "0",
                            border: "none"
                        }}
                    >
                        {isRemoving ? (
                            <i className="fa fa-spinner fa-spin" style={{ fontSize: "0.875rem" }}></i>
                        ) : (
                            <i className="fa-solid fa-heart-crack" style={{ fontSize: "0.875rem" }}></i>
                        )}
                    </button>
                </div>

                <div className="book-cover">
                    {book.cover_image ? (
                        <img
                            src={book.cover_image}
                            alt={`Portada de ${book.title}`}
                            className="img-fluid rounded shadow"
                        />
                    ) : (
                        <div className="no-cover-placeholder rounded shadow d-flex align-items-center justify-content-center text-center">
                            <span>Sin portada disponible</span>
                        </div>
                    )}
                </div>

                <div className="book-info mt-3" style={{ minWidth: 0 }}>
                    <h5 className="book-title text-truncate">{book.title}</h5>
                    <p className="book-author mb-1 text-truncate">{book.author_name}</p>
                    <div className="book-meta d-flex flex-wrap gap-1 mt-2" style={{ overflow: "hidden" }}>
                        <span className="badge bg-primary text-truncate" style={{ maxWidth: "100%" }}>
                            {book.genre || 'Sin género'}
                        </span>
                        <span className="badge bg-secondary text-truncate" style={{ maxWidth: "100%" }}>
                            {book.category || 'Sin categoría'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};