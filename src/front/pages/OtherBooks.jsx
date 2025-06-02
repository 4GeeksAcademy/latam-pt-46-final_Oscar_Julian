import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { MessageAlert } from "../component/MessageAlert";
import { OtherUserBookCard } from "../component/OtherUserBookCard";
import { CreateReviewModal } from "../component/ReviewModals";

export const OtherBooks = () => {
    const { store, actions } = useGlobalReducer();
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [reviewForm, setReviewForm] = useState({
        review_text: "",
        rating: ""
    });

    // Cargar libros de otros usuarios cuando el componente se monta
    useEffect(() => {
        const loadBooks = async () => {
            await actions.getOtherUsersBooks();
            setLoading(false);
        };

        loadBooks();
    }, []);

    // Resetear el formulario de review
    const resetReviewForm = () => {
        setReviewForm({
            review_text: "",
            rating: ""
        });
    };

    // Manejar cambios en el formulario de review
    const handleReviewInputChange = (e) => {
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value
        });
    };

    // Preparar para dejar review
    const prepareLeaveReview = (book) => {
        setSelectedBook(book);
        resetReviewForm();
        setShowReviewModal(true);
    };

    // Manejar envío de review
    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!reviewForm.review_text) {
            actions.setMessage("El texto de la review es obligatorio");
            return;
        }

        try {
            const reviewData = {
                book_id: selectedBook.id,
                review_text: reviewForm.review_text,
                rating: reviewForm.rating ? parseInt(reviewForm.rating) : null
            };

            const success = await actions.createReview(reviewData);
            if (success) {
                setShowReviewModal(false);
                resetReviewForm();
                setSelectedBook(null);
            }
        } catch (error) {
            actions.setMessage("Error al enviar la review: " + error.message);
        }
    };

    // Mostrar estado de carga inicial
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
                            Explora los libros compartidos por la comunidad y deja tus reviews
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
                        {store.otherUsersBooks.map((userData, userIndex) => (
                            <div
                                key={userData.user_id}
                                className="user-books-section mb-5 pb-4 border-bottom border-secondary"
                            >
                                <h3 className="user-email mb-3">
                                    <i className="fa-solid fa-user me-2"></i>
                                    Libros de: {userData.username || userData.user_email.split('@')[0].charAt(0).toUpperCase() + userData.user_email.split('@')[0].slice(1)}
                                </h3>
                                {userData.books && userData.books.length > 0 ? (
                                    <div className="books-grid">
                                        {userData.books.map((book, bookIndex) => (
                                            <div
                                                key={book.id}
                                                className="book-appear"
                                                style={{ animationDelay: `${(userIndex * userData.books.length + bookIndex) * 0.05}s` }}
                                            >
                                                <OtherUserBookCard
                                                    book={book}
                                                    onLeaveReview={prepareLeaveReview}
                                                />
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

            {/* Modal para crear review */}
            <CreateReviewModal
                show={showReviewModal}
                onClose={() => {
                    setShowReviewModal(false);
                    setSelectedBook(null);
                    resetReviewForm();
                }}
                book={selectedBook}
                reviewForm={reviewForm}
                onInputChange={handleReviewInputChange}
                onSubmit={handleSubmitReview}
                isLoading={store.isLoading}
            />

            {/* Overlay oscuro para el modal */}
            {showReviewModal && (
                <div className="modal-backdrop fade show"></div>
            )}

            {/* Componente de mensaje */}
            <MessageAlert />
        </div>
    );
};