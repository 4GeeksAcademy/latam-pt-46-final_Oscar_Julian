export const PersonalBookCard = ({ book, onEdit, onDelete, onViewReviews, onViewDetails  }) => {
    return (
        <div 
            className="book-card-container"
            onClick={() => onViewDetails(book)}
            style={{ cursor: 'pointer' }}
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

            {/* Botones de acción */}
            <div className="book-actions">
                <button
                    className="btn btn-sm btn-outline-info me-1"
                    onClick={() => onViewReviews(book)}
                    title="Ver reviews"
                >
                    <i className="fa-solid fa-comments"></i>
                </button>
                <button
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => onEdit(book)}
                    title="Editar libro"
                >
                    <i className="fa-solid fa-edit"></i>
                </button>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(book)}
                    title="Eliminar libro"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};