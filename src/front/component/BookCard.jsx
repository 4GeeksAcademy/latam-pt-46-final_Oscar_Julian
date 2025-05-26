import { useState } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const BookCard = ({ book, onViewDetails }) => {
    const { store, actions } = useGlobalReducer();
    const [isProcessing, setIsProcessing] = useState(false);

    // Verificar si el libro está en favoritos usando el store global
    const isFavorite = store.favorites.some(fav => 
        fav.book_type === 'explore' && fav.explore_book_id === book.id
    );

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

            // Paso 1: Crear libro personal
            const personalBookResponse = await actions.createPersonalBookFromExplore(personalBookData);
            
            if (personalBookResponse) {
                // Paso 2: Agregar a favoritos
                const favoriteResponse = await actions.addExploreFavorite(book.id);
                
                if (favoriteResponse) {
                    // Actualizar la lista global de favoritos
                    await actions.getFavorites();
                    actions.setMessage("¡Libro agregado a tu biblioteca y favoritos!");
                }
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="book-card position-relative">
            {/* Mostrar botón de favorito solo si no está en favoritos */}
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

            {/* Contenido de la tarjeta */}
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
            
            <div className="book-info mt-3" style={{ minWidth: 0 }}>
                <h5 className="book-title text-truncate">{book.title}</h5>
                <p className="book-author mb-1 text-truncate">{book.author}</p>
                <div className="book-meta d-flex flex-wrap gap-1 mt-2" style={{ overflow: "hidden" }}>
                    <span className="badge bg-primary text-truncate" style={{ maxWidth: "100%" }}>
                        {book.genre}
                    </span>
                    <span className="badge bg-secondary text-truncate" style={{ maxWidth: "100%" }}>
                        {book.category}
                    </span>
                </div>
            </div>
        </div>
    );
};