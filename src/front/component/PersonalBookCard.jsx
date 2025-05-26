import { useGlobalReducer } from "../store/globalReducer";

export const PersonalBookCard = ({ book, onEdit, onDelete, onViewReviews, onViewDetails, Favorites }) => {

    const { store } = useGlobalReducer();

     // Verifica si el libro está en favoritos
    const isFavorite = store.favorites.some(fav => 
        (fav.book_type === 'personal' && fav.personal_book_id === book.id) ||
        (fav.book_type === 'explore' && fav.book?.title === book.title)
    );
    

    return (
        <div 
            className="book-card-container"
            onClick={() => onViewDetails(book)}
            style={{ cursor: 'pointer' }}
        >
            <div className="book-card">
                {/* Estrella de favoritos */}
                {isFavorite && (
                    <div className="position-absolute top-0 start-0 m-2" 
                         style={{ zIndex: 1, fontSize: "1.5rem" }}>
                        <i className="fas fa-star text-warning"></i>
                    </div>
                )}

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

            {/* Botones de acción */}
            <div className="book-actions">
                <button
                    className="btn btn-sm btn-outline-info me-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewReviews(book);
                    }}
                    title="Ver reviews"
                >
                    <i className="fa-solid fa-comments"></i>
                </button>
                <button
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(book);
                    }}
                    title="Editar libro"
                >
                    <i className="fa-solid fa-edit"></i>
                </button>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(book);
                    }}
                    title="Eliminar libro"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};