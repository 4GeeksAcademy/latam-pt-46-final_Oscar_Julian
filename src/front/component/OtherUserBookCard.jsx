import React from "react";

export const OtherUserBookCard = ({ book, onLeaveReview }) => {
    return (
        <div className="book-card-container">
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

            {/* Botón de acción para dejar review */}
            <div className="book-actions">
                <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => onLeaveReview(book)}
                    title="Dejar una review"
                >
                    <i className="fa-solid fa-star"></i>
                </button>
            </div>
        </div>
    );
};