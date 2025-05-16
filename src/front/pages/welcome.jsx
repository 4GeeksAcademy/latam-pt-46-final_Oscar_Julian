import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { BookCard } from "../component/BookCard";
import { Pagination } from "../component/Pagination";
import { FilterBar } from "../component/FilterBar";

export const Welcome = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Verificar autenticación cuando el componente carga
    useEffect(() => {
        const checkAuth = async () => {
            await actions.validateToken();
            setLoading(false);
        };

        checkAuth();
    }, []);

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
                            <i className="fa-solid fa-filter"></i>
                            <span>Mostrando: {store.booksPerPage} por página</span>
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
                                    <BookCard book={book} />
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
        </div>
    );
};