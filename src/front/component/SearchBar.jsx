import React, { useState } from "react";
import { useGlobalReducer } from "../store/globalReducer";

export const SearchBar = () => {
    const { actions } = useGlobalReducer();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        actions.setFilters({ search: searchQuery });
        actions.getBooks(1, { search: searchQuery });
    };

    return (
        <form className="d-flex mx-2 flex-grow-1 mx-lg-4" onSubmit={handleSearch}>
            <div className="input-group">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Buscar libros..."
                    aria-label="Buscar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit">
                    <i className="fa-solid fa-search"></i>
                </button>
            </div>
        </form>
    );
};