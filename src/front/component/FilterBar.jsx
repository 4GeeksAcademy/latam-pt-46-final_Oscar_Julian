import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const FilterBar = ({ bookType = "explore" }) => {
    const { store, actions, dispatch } = useGlobalReducer();

    // Estados para los selectores
    const [authorFilter, setAuthorFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Listados únicos para los filtros
    const [uniqueAuthors, setUniqueAuthors] = useState([]);
    const [uniqueGenres, setUniqueGenres] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);

    // Obtener libros filtrados
    const getBooksData = () => {
        if (bookType === "personal") {
            return store.personalBooks || [];
        }
        return store.books || [];
    };

    // Obtener nombre de autor según el tipo
    const getAuthorName = (book) => {
        return bookType === "personal" ? book.author_name : book.author;
    };

    // Actualizar listas únicas
    useEffect(() => {
        const booksData = getBooksData();

        if (booksData?.length > 0) {
            const authors = [...new Set(booksData.map(book => getAuthorName(book)).filter(Boolean))];
            setUniqueAuthors(authors.sort());

            const genres = [...new Set(booksData.map(book => book.genre).filter(Boolean))];
            setUniqueGenres(genres.sort());

            const categories = [...new Set(booksData.map(book => book.category).filter(Boolean))];
            setUniqueCategories(categories.sort());
        }
    }, [store.personalBooks, store.books, bookType]);

    // Aplicar filtros al servidor
    const applyFilters = () => {
        const filters = {
            author: authorFilter,
            genre: genreFilter,
            category: categoryFilter
        };
        actions.setFilters(filters);

        if (bookType === "personal") {
            actions.getPersonalBooks(1, { ...store.filters, ...filters });
        } else {
            actions.getBooks(1, { ...store.filters, ...filters });
        }
    };

    // Limpiar todos los filtros
    const clearFilters = () => {
        setAuthorFilter("");
        setGenreFilter("");
        setCategoryFilter("");
        setSortBy("title");
        setSortOrder("asc");
        actions.clearFilters();

        if (bookType === "personal") {
            actions.getPersonalBooks(1, {});
        } else {
            actions.getBooks(1, {});
        }
    };

    // Ordenar libros
    const applySort = () => {
        const booksData = getBooksData();
        if (!booksData?.length) return;

        const sortedBooks = [...booksData].sort((a, b) => {
            const valueA = (sortBy === "author" ? getAuthorName(a) : a[sortBy])?.toLowerCase() || "";
            const valueB = (sortBy === "author" ? getAuthorName(b) : b[sortBy])?.toLowerCase() || "";

            return sortOrder === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });

        dispatch({
            type: bookType === "personal" ? 'set_personal_books' : 'set_books',
            payload: sortedBooks
        });
    };

    useEffect(() => {
        applySort();
    }, [sortBy, sortOrder]);

    return (
        <div className="filter-bar p-3 mb-4 rounded shadow-sm">
            <div className="d-flex flex-wrap align-items-end gap-3">
                {/* Filtro de Autor */}
                <div className="filter-group">
                    <label htmlFor="author-filter" className="form-label">Autor</label>
                    <select
                        id="author-filter"
                        className="form-select"
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                    >
                        <option value="">Todos los autores</option>
                        {uniqueAuthors.map((author, index) => (
                            <option key={`author-${index}`} value={author}>{author}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro de Género */}
                <div className="filter-group">
                    <label htmlFor="genre-filter" className="form-label">Género</label>
                    <select
                        id="genre-filter"
                        className="form-select"
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                    >
                        <option value="">Todos los géneros</option>
                        {uniqueGenres.map((genre, index) => (
                            <option key={`genre-${index}`} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro de Categoría */}
                <div className="filter-group">
                    <label htmlFor="category-filter" className="form-label">Categoría</label>
                    <select
                        id="category-filter"
                        className="form-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={`category-${index}`} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Ordenamiento */}
                <div className="filter-group">
                    <label htmlFor="sort-by" className="form-label">Ordenar por</label>
                    <select
                        id="sort-by"
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="title">Título</option>
                        <option value="author">Autor</option>
                        <option value="genre">Género</option>
                        <option value="category">Categoría</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sort-order" className="form-label">Orden</label>
                    <select
                        id="sort-order"
                        className="form-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>

                {/* Botones de Acción */}
                <div className="filter-actions mt-3 mt-md-0 d-flex gap-2">
                    {bookType === "personal" && (
                        <Link
                            to="/favorites"
                            className="btn btn-outline-danger"
                        >
                            <i className="fa-solid fa-heart me-1"></i>
                            Ver Favoritos
                        </Link>
                    )}

                    <button className="btn btn-primary" onClick={applyFilters}>
                        <i className="fa-solid fa-filter me-1"></i> Aplicar
                    </button>

                    <button className="btn btn-secondary" onClick={clearFilters}>
                        <i className="fa-solid fa-broom me-1"></i> Limpiar
                    </button>
                </div>
            </div>
        </div>
    );
};