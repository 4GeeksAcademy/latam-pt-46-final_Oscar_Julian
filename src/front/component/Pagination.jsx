import { useEffect } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const Pagination = () => {
    const { store, actions } = useGlobalReducer();
    const { totalBooks, booksPerPage, currentPage } = store;

    const totalPages = Math.ceil(totalBooks / booksPerPage);

    // Generar el rango de páginas a mostrar
    const getPageRange = () => {
        const range = [];
        const delta = 2; // Número de páginas a mostrar antes y después de la página actual

        for (
            let i = Math.max(1, currentPage - delta);
            i <= Math.min(totalPages, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        return range;
    };

    // Cambiar de página
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        if (newPage >= totalPages) newPage = totalPages;
        console.log(newPage, totalPages);
        
        actions.changePage(newPage);
        actions.getBooks(newPage, store.filters);

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Paginación de libros">
            <ul className="pagination justify-content-center">
                {/* Botón Primera página */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        aria-label="Primera página"
                    >
                        <i className="fa-solid fa-angles-left"></i>
                    </button>
                </li>

                {/* Botón Anterior */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Página anterior"
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                </li>

                {/* Números de página */}
                {getPageRange().map(page => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Botón Siguiente */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Siguiente página"
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </li>

                {/* Botón Última página */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        aria-label="Última página"
                    >
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};