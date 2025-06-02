export const CreateReviewModal = ({
    show,
    onClose,
    book,
    reviewForm,
    onInputChange,
    onSubmit,
    isLoading
}) => {
    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">
                            <i className="fa-solid fa-star me-2"></i>
                            Dejar Review - {book?.title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="review_text" className="form-label">
                                    Tu Review <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="review_text"
                                    name="review_text"
                                    rows="5"
                                    value={reviewForm.review_text}
                                    onChange={onInputChange}
                                    placeholder="Escribe tu opinión sobre este libro..."
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">
                                    Calificación (1-5 estrellas)
                                </label>
                                <select
                                    className="form-select"
                                    id="rating"
                                    name="rating"
                                    value={reviewForm.rating}
                                    onChange={onInputChange}
                                >
                                    <option value="">Selecciona una calificación</option>
                                    <option value="1">⭐ 1 estrella</option>
                                    <option value="2">⭐⭐ 2 estrellas</option>
                                    <option value="3">⭐⭐⭐ 3 estrellas</option>
                                    <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
                                    <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Guardando...' : 'Guardar Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Modal para ver las reviews de un libro
export const ViewReviewsModal = ({
    show,
    onClose,
    book,
    reviews,
    isLoading,
    currentUser
}) => {
    if (!show) return null;

    const renderStars = (rating) => {
        if (!rating) return "Sin calificación";
        return "⭐".repeat(rating);
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-info text-white">
                        <h5 className="modal-title">
                            <i className="fa-solid fa-comments me-2"></i>
                            Reviews - {book?.title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {isLoading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando reviews...</span>
                                </div>
                            </div>
                        ) : reviews && reviews.length > 0 ? (
                            <div className="reviews-list">
                                {reviews.map((review, index) => (
                                    <div key={review.id || index} className="review-item border-bottom pb-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div className="review-header">
                                                <strong className="text-primary">
                                                    <i className="fa-solid fa-user me-1"></i>
                                                    {review.username || `Usuario desconocido`}
                                                </strong>
                                                <div className="review-rating mt-1">
                                                    <span className="text-warning">
                                                        {renderStars(review.rating)}
                                                    </span>
                                                    {review.rating && (
                                                        <span className="text-muted ms-2">
                                                            ({review.rating}/5)
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review-text">
                                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                                                {review.review_text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <i className="fa-solid fa-comment-slash fa-3x text-muted mb-3"></i>
                                <h6 className="text-muted">No hay reviews para este libro</h6>
                                <p className="text-muted">Este libro aún no tiene reviews de la comunidad.</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <div className="text-muted">
                            {reviews && reviews.length > 0 && (
                                <small>
                                    <i className="fa-solid fa-info-circle me-1"></i>
                                    Mostrando {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                                </small>
                            )}
                        </div>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};