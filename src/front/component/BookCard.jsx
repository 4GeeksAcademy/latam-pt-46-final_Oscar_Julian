import React, { useState, useEffect } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const BookCard = ({ book, onViewDetails }) => {
    const { store, actions } = useGlobalReducer();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Verificar si el libro está en favoritos
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!store.user) return;
            
            try {
                const { success, favorites } = await actions.getFavorites();
                if (success) {
                    const isBookFavorite = favorites.some(fav => 
                        fav.book_type === 'explore' && fav.book?.id === book.id
                    );
                    setIsFavorite(isBookFavorite);
                }
            } catch (error) {
                console.error("Error checking favorites:", error);
            }
        };

        checkFavoriteStatus();
    }, [store.user, book.id, actions]);

    const handleAddToLibraryAndFavorites = async () => {
        setIsProcessing(true);
        try {
            const personalBookData = {
                title: book.title,
                author_name: book.author,
                genre: book.genre,
                category: book.category,
                summary: book.summary,
                cover_image: book.coverImage
            };

            const personalBookResponse = await actions.createPersonalBookFromExplore(personalBookData);
            
            if (personalBookResponse) {
                const favoriteResponse = await actions.addExploreFavorite(book.id);
                if (favoriteResponse) {
                    setIsFavorite(true); // Actualizar estado local
                    actions.setMessage("¡Libro agregado a tu biblioteca y favoritos!");
                }
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="book-card position-relative">
            {/* Mostrar estrella solo si no es favorito */}
            {!isFavorite && (
                <button
                    className="btn btn-icon position-absolute top-0 start-0 m-2"
                    onClick={handleAddToLibraryAndFavorites}
                    disabled={isProcessing}
                    style={{ zIndex: 1 }}
                >
                    <i className={`fa${isProcessing ? ' fa-spinner fa-spin' : 's'} fa-star text-warning`}></i>
                </button>
            )}

            <div className="book-cover" onClick={onViewDetails}>
                {book.coverImage ? (
                    <img
                        src={book.coverImage}
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
                <p className="book-author mb-1 text-truncate">{book.author}</p>
                <div className="book-meta d-flex flex-wrap gap-1 mt-2">
                    <span className="badge bg-primary">{book.genre}</span>
                    <span className="badge bg-secondary">{book.category}</span>
                </div>
            </div>
        </div>
    );
};