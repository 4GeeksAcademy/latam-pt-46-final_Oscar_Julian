import { useState } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const BookCard = ({ book, onViewDetails }) => {
    const { store, actions } = useGlobalReducer();
    const [isProcessing, setIsProcessing] = useState(false);

    // Verificar si el libro está en favoritos usando el helper del store
    const isFavorite = actions.isFavorite(book.id, 'explore');

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();
        setIsProcessing(true);

        try {
            if (isFavorite) {
                // Encontrar el favorito y eliminarlo
                const favorite = store.favorites.find(fav =>
                    fav.book_type === 'explore' && fav.explore_book_id === book.id
                );

                if (favorite) {
                    const success = await actions.removeFavorite(favorite.id);
                    if (success) {
                        // Forzar actualización de favoritos
                        await actions.getFavorites();
                    }
                }
            } else {
                // Agregar a favoritos
                const success = await actions.addExploreFavorite(book.id);
                if (success) {
                    // Forzar actualización de favoritos
                    await actions.getFavorites();
                }
            }
        } catch (error) {
            console.error("Error al manejar favorito:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="book-card position-relative">
            {/* Botón de favorito que siempre aparece */}
            <button
                className="btn btn-icon position-absolute m-1 m-md-2"
                onClick={handleToggleFavorite}
                disabled={isProcessing}
                style={{ top: '4px', left: '4px', zIndex: 2 }}
                title={isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
            >
                <i className={`fa${isFavorite ? 's' : 'r'} fa-heart ${isProcessing ? 'fa-spinner fa-spin' :
                    isFavorite ? 'text-danger' : 'text-white-50'
                    }`}></i>
            </button>

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