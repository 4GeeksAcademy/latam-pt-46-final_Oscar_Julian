import { useState, useEffect } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const FilterBar = ({ bookType = "explore" }) => {
    const { store, actions, dispatch } = useGlobalReducer();

    // Estados para los selectores de filtro y ordenamiento
    const [authorFilter, setAuthorFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Listados únicos para los filtros
    const [uniqueAuthors, setUniqueAuthors] = useState([]);
    const [uniqueGenres, setUniqueGenres] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);

    // Determinar qué libros usar según el tipo
    const getBooksData = () => {
        if (bookType === "personal") {
            return store.personalBooks || [];
        }
        return store.books || [];
    };

    // Obtener el nombre del autor según el tipo de libro
    const getAuthorName = (book) => {
        if (bookType === "personal") {
            return book.author_name;
        }
        return book.author;
    };

    // Extraer los valores únicos de los libros cuando cambian
    useEffect(() => {
        const booksData = getBooksData();

        if (booksData && booksData.length > 0) {
            // Extraer autores únicos
            const authors = [...new Set(booksData.map(book => getAuthorName(book)).filter(Boolean))];
            setUniqueAuthors(authors.sort());

            // Extraer géneros únicos
            const genres = [...new Set(booksData.map(book => book.genre).filter(Boolean))];
            setUniqueGenres(genres.sort());

            // Extraer categorías únicas
            const categories = [...new Set(booksData.map(book => book.category).filter(Boolean))];
            setUniqueCategories(categories.sort());
        }
    }, [bookType === "personal" ? store.personalBooks : store.books, bookType]);

    // Aplicar filtros
    const applyFilters = () => {
        const filters = {
            author: authorFilter,
            genre: genreFilter,
            category: categoryFilter
        };

        actions.setFilters(filters);

        // Llamar a la función correcta según el tipo de libro
        if (bookType === "personal") {
            actions.getPersonalBooks(1, { ...store.filters, ...filters });
        } else {
            actions.getBooks(1, { ...store.filters, ...filters });
        }
    };

    // Limpiar filtros
    const clearFilters = () => {
        setAuthorFilter("");
        setGenreFilter("");
        setCategoryFilter("");
        setSortBy("title");
        setSortOrder("asc");

        actions.clearFilters();

        // Llamar a la función correcta según el tipo de libro
        if (bookType === "personal") {
            actions.getPersonalBooks(1, {});
        } else {
            actions.getBooks(1, {});
        }
    };

    // Aplicar ordenamiento
    const applySort = () => {
        const booksData = getBooksData();
        if (!booksData || booksData.length === 0) return;

        const sortedBooks = [...booksData].sort((a, b) => {
            let valueA = "";
            let valueB = "";

            if (sortBy === "author") {
                valueA = getAuthorName(a)?.toLowerCase() || "";
                valueB = getAuthorName(b)?.toLowerCase() || "";
            } else {
                valueA = a[sortBy]?.toLowerCase() || "";
                valueB = b[sortBy]?.toLowerCase() || "";
            }

            if (sortOrder === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });

        // Usar dispatch correctamente con el action type apropiado
        if (bookType === "personal") {
            dispatch({ type: 'set_personal_books', payload: sortedBooks });
        } else {
            dispatch({ type: 'set_books', payload: sortedBooks });
        }
    };

    // Aplicar ordenamiento cuando cambian los parámetros de ordenamiento
    useEffect(() => {
        const booksData = getBooksData();
        if (booksData && booksData.length > 0) {
            applySort();
        }
    }, [sortBy, sortOrder]);

    return (
        <div className="filter-bar p-3 mb-4 rounded shadow-sm">
            <div className="d-flex flex-wrap align-items-end gap-3">
                {/* Filtro por autor */}
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
                            <option key={index} value={author}>{author}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por género */}
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
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por categoría */}
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
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Ordenar por */}
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

                {/* Orden */}
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

                {/* Botones de acción */}
                <div className="filter-actions mt-3 mt-md-0">
                    <button
                        className="btn btn-primary me-2"
                        onClick={applyFilters}
                    >
                        <i className="fa-solid fa-filter me-1"></i> Aplicar Filtros
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={clearFilters}
                    >
                        <i className="fa-solid fa-broom me-1"></i> Limpiar
                    </button>
                </div>
            </div>
        </div>
    );
};