import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { MessageAlert } from "../component/MessageAlert";

export const OtherBooks = () => {
    const { store, actions } = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    // Cargar libros de otros usuarios cuando el componente se monta
    useEffect(() => {
        const loadBooks = async () => {
            await actions.getOtherUsersBooks();
            setLoading(false);
        };

        loadBooks();
    }, []);

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

    return (
        <div className="book-library-container">
            <div className="container">
                {/* Cabecera de la biblioteca */}
                <div className="library-header d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="library-heading">
                            <i className="fa-solid fa-users me-2"></i>
                            Libros de Otros Usuarios
                        </h1>
                        <p className="lead text-white-50">
                            Explora los libros compartidos por la comunidad
                        </p>
                    </div>
                    <div>
                        <Link to="/library" className="btn btn-outline-light btn-lg">
                            <i className="fa-solid fa-arrow-left me-2"></i>
                            Volver a Mi Biblioteca
                        </Link>
                    </div>
                </div>

                {/* Área principal de libros por usuario */}
                {store.isLoading ? (
                    <div className="loading-indicator">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando libros...</span>
                        </div>
                    </div>
                ) : store.otherUsersBooks && store.otherUsersBooks.length > 0 ? (
                    <div className="other-users-books">
                        {store.otherUsersBooks.map((userData, index) => (
                            <div
                                key={userData.user_id}
                                className="user-books-section mb-5 pb-4 border-bottom border-secondary"
                            >
                                <h3 className="user-email mb-3">
                                    <i className="fa-solid fa-user me-2"></i>
                                    Libros de: {userData.user_email}
                                </h3>
                                {userData.books && userData.books.length > 0 ? (
                                    <div className="books-grid">
                                        {userData.books.map((book) => (
                                            <div
                                                key={book.id}
                                                className="book-appear"
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                <div className="book-card">
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
                                                    <div className="book-info mt-3">
                                                        <h5 className="book-title text-truncate">{book.title}</h5>
                                                        <p className="book-author mb-1 text-truncate">{book.author_name}</p>
                                                        <div className="book-meta d-flex flex-wrap gap-1 mt-2">
                                                            {book.genre && <span className="badge bg-primary">{book.genre}</span>}
                                                            {book.category && <span className="badge bg-secondary">{book.category}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white-50">Este usuario no tiene libros compartidos.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-library">
                        <i className="fa-solid fa-face-frown"></i>
                        <h3>No hay libros de otros usuarios</h3>
                        <p>
                            Parece que no hay otros usuarios con libros compartidos en este momento.
                        </p>
                        <Link to="/library" className="btn btn-primary mt-3">
                            <i className="fa-solid fa-arrow-left me-2"></i>
                            Volver a Mi Biblioteca
                        </Link>
                    </div>
                )}
            </div>

            {/* Componente de mensaje */}
            <MessageAlert />
        </div>
    );
};