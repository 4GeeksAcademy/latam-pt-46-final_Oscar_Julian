import React from "react";

export const BookCard = ({ book, onViewDetails }) => {
    return (
        <div className="book-card">
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