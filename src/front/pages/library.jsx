import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Añadir Link
import { useGlobalReducer } from "../store/globalReducer";
import { Pagination } from "../component/Pagination";
import { FilterBar } from "../component/FilterBar";
import { MessageAlert } from "../component/MessageAlert";
import { PersonalBookCard } from "../component/PersonalBookCard";
import { ViewReviewsModal } from "../component/ReviewModals";
import AWS from 'aws-sdk';

export const Library = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookForm, setBookForm] = useState({
        title: "",
        author_name: "",
        genre: "",
        category: "",
        summary: "",
        coverImage: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // Configurar AWS S3
    const configureS3 = () => {
        AWS.config.update({
            accessKeyId: 'AKIAYGOFFXF44MGJIDMV',
            secretAccessKey: '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',
            region: 'us-east-2'
        });
        return new AWS.S3();
    };

    // Verificar autenticación cuando el componente carga
    useEffect(() => {
        const checkAuth = async () => {
            await actions.validateToken();
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Cargar libros personales cuando el componente se monta
    useEffect(() => {
        if (!loading && store.isAuthenticated) {
            actions.getPersonalBooks();
        }
    }, [loading, store.isAuthenticated]);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!loading && !store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, loading, navigate]);

    // Resetear el formulario
    const resetForm = () => {
        setBookForm({
            title: "",
            author_name: "",
            genre: "",
            category: "",
            summary: "",
            coverImage: null
        });
        setPreviewImage(null);
        setUploadProgress(0);
    };

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        setBookForm({
            ...bookForm,
            [e.target.name]: e.target.value
        });
    };

    // Manejar selección de imagen
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setBookForm({
                ...bookForm,
                coverImage: file
            });

            // Generar vista previa
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Subir imagen a AWS S3
    const uploadImageToS3 = async (file) => {
        const s3 = configureS3();
        const fileName = `${Date.now()}-${file.name}`;

        const params = {
            Bucket: 'picturesfinalproject',
            Key: fileName,
            Body: file,
            ContentType: file.type
        };

        setIsUploading(true);

        try {
            // Configurar el evento de carga para mostrar el progreso
            const upload = s3.upload(params);

            upload.on('httpUploadProgress', (evt) => {
                const progress = Math.round((evt.loaded / evt.total) * 100);
                setUploadProgress(progress);
            });

            const data = await upload.promise();
            setIsUploading(false);
            return data.Location; // URL de la imagen subida
        } catch (error) {
            console.error("Error uploading image:", error);
            setIsUploading(false);
            throw error;
        }
    };

    // Manejar creación de libro
    const handleCreateBook = async (e) => {
        e.preventDefault();

        if (!bookForm.title || !bookForm.author_name) {
            actions.setMessage("Título y autor son campos obligatorios");
            return;
        }

        try {
            let coverImageUrl = "";
            if (bookForm.coverImage) {
                coverImageUrl = await uploadImageToS3(bookForm.coverImage);
            }

            const newBook = {
                title: bookForm.title,
                author_name: bookForm.author_name,
                genre: bookForm.genre,
                category: bookForm.category,
                summary: bookForm.summary,
                cover_image: coverImageUrl
            };

            const success = await actions.createPersonalBook(newBook);
            if (success) {
                setShowAddModal(false);
                resetForm();
            }
        } catch (error) {
            actions.setMessage("Error al crear el libro: " + error.message);
        }
    };

    // Preparar edición de libro
    const prepareEditBook = (book) => {
        setSelectedBook(book);
        setBookForm({
            title: book.title,
            author_name: book.author_name,
            genre: book.genre,
            category: book.category,
            summary: book.summary,
            coverImage: null
        });
        setPreviewImage(book.cover_image);
        setShowEditModal(true);
    };

    // Manejar actualización de libro
    const handleUpdateBook = async (e) => {
        e.preventDefault();

        if (!bookForm.title || !bookForm.author_name) {
            actions.setMessage("Título y autor son campos obligatorios");
            return;
        }

        try {
            let coverImageUrl = selectedBook.cover_image;
            if (bookForm.coverImage) {
                coverImageUrl = await uploadImageToS3(bookForm.coverImage);
            }

            const updatedBook = {
                id: selectedBook.id,
                title: bookForm.title,
                author_name: bookForm.author_name,
                genre: bookForm.genre,
                category: bookForm.category,
                summary: bookForm.summary,
                cover_image: coverImageUrl
            };

            const success = await actions.updatePersonalBook(updatedBook);
            if (success) {
                setShowEditModal(false);
                resetForm();
            }
        } catch (error) {
            actions.setMessage("Error al actualizar el libro: " + error.message);
        }
    };

    // Preparar eliminación de libro
    const prepareDeleteBook = (book) => {
        setSelectedBook(book);
        setShowDeleteModal(true);
    };

    // Manejar eliminación de libro
    const handleDeleteBook = async () => {
        try {
            const success = await actions.deletePersonalBook(selectedBook.id);
            if (success) {
                setShowDeleteModal(false);
                setSelectedBook(null);
            }
        } catch (error) {
            actions.setMessage("Error al eliminar el libro: " + error.message);
        }
    };

    // Preparar para ver reviews
    const prepareViewReviews = async (book) => {
        setSelectedBook(book);
        setShowReviewsModal(true);
        // Cargar las reviews del libro
        await actions.getBookReviews(book.id);
    };

    // Filtrar libros localmente según los filtros aplicados
    const getFilteredBooks = () => {
        if (!store.personalBooks || store.personalBooks.length === 0) return [];

        return store.personalBooks.filter(book => {
            // Aplicar filtro de autor si existe
            if (store.filters.author && book.author_name !== store.filters.author) {
                return false;
            }

            // Aplicar filtro de género si existe
            if (store.filters.genre && book.genre !== store.filters.genre) {
                return false;
            }

            // Aplicar filtro de categoría si existe
            if (store.filters.category && book.category !== store.filters.category) {
                return false;
            }

            // Aplicar filtro de búsqueda si existe
            if (store.filters.search && !book.title.toLowerCase().includes(store.filters.search.toLowerCase()) &&
                !book.author_name.toLowerCase().includes(store.filters.search.toLowerCase())) {
                return false;
            }

            return true;
        });
    };

    // Mostrar estado de carga
    if (loading) {
        return (
            <div className="loading-indicator">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // No mostrar nada si no está autenticado (la redirección se hará en el useEffect)
    if (!store.isAuthenticated) {
        return null;
    }

    // Obtener libros filtrados
    const filteredBooks = getFilteredBooks();

    return (
        <div className="book-library-container">
            <div className="container">
                {/* Cabecera de la biblioteca */}
                <div className="library-header d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="library-heading">
                            <i className="fa-solid fa-book-open me-2"></i>
                            Mi Biblioteca Personal
                        </h1>
                        <p className="lead text-white-50">
                            Administra tu colección personal de libros
                        </p>
                        <div className="library-stats">
                            <div className="stat-item">
                                <i className="fa-solid fa-book"></i>
                                <span>Total: {store.totalPersonalBooks} libros</span>
                            </div>
                            <div className="stat-item">
                                <i className="fa-solid fa-bookmark"></i>
                                <span>Página: {store.currentPage}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        {/* Botón para ver los libros de otros usuarios */}
                        <Link to="/other-books" className="btn btn-outline-light btn-lg">
                            <i className="fa-solid fa-users me-2"></i>
                            Otros Libros
                        </Link>

                        {/* Botón para agregar nuevo libro */}
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                                resetForm();
                                setShowAddModal(true);
                            }}
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            Agregar Libro
                        </button>
                    </div>
                </div>

                {/* Barra de filtros */}
                <FilterBar bookType="personal" />

                {/* Área principal de libros */}
                {store.isLoading ? (
                    <div className="loading-indicator">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando libros...</span>
                        </div>
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <>
                        <div className="books-grid">
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="book-appear"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <PersonalBookCard
                                        book={book}
                                        onEdit={prepareEditBook}
                                        onDelete={prepareDeleteBook}
                                        onViewReviews={prepareViewReviews}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <Pagination />
                    </>
                ) : (
                    <div className="empty-library">
                        <i className="fa-solid fa-face-frown"></i>
                        <h3>No se encontraron libros</h3>
                        <p>
                            No hay libros en tu biblioteca personal. ¡Comienza agregando tu primer libro!
                        </p>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => {
                                resetForm();
                                setShowAddModal(true);
                            }}
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            Agregar mi primer libro
                        </button>
                    </div>
                )}
            </div>

            {/* Modal para agregar libro */}
            {showAddModal && (
                <div className="modal bg-dark show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg bg-dark">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Agregar Nuevo Libro</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <form onSubmit={handleCreateBook}>
                                <div className="modal-body text-black">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label">Título <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    value={bookForm.title}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="author_name" className="form-label">Autor <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="author_name"
                                                    name="author_name"
                                                    value={bookForm.author_name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="genre" className="form-label">Género</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="genre"
                                                        name="genre"
                                                        value={bookForm.genre}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="category" className="form-label">Categoría</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="category"
                                                        name="category"
                                                        value={bookForm.category}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="summary" className="form-label">Resumen</label>
                                                <textarea
                                                    className="form-control"
                                                    id="summary"
                                                    name="summary"
                                                    rows="4"
                                                    value={bookForm.summary}
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="coverImage" className="form-label">Portada del libro</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="coverImage"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                {isUploading && (
                                                    <div className="mt-2">
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{ width: `${uploadProgress}%` }}
                                                                aria-valuenow={uploadProgress}
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            >
                                                                {uploadProgress}%
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="cover-preview mb-3">
                                                {previewImage ? (
                                                    <img
                                                        src={previewImage}
                                                        alt="Vista previa de portada"
                                                        className="img-thumbnail"
                                                        style={{ maxHeight: "250px", width: "100%", objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <div className="no-cover-placeholder rounded" style={{ height: "250px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <span className="text-muted">Sin portada</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary" disabled={isUploading}>
                                        {isUploading ? 'Subiendo...' : 'Guardar Libro'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para editar libro */}
            {showEditModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Editar Libro</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <form onSubmit={handleUpdateBook}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <label htmlFor="edit-title" className="form-label">Título <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="edit-title"
                                                    name="title"
                                                    value={bookForm.title}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="edit-author_name" className="form-label">Autor <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="edit-author_name"
                                                    name="author_name"
                                                    value={bookForm.author_name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="edit-genre" className="form-label">Género</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="edit-genre"
                                                        name="genre"
                                                        value={bookForm.genre}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="edit-category" className="form-label">Categoría</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="edit-category"
                                                        name="category"
                                                        value={bookForm.category}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="edit-summary" className="form-label">Resumen</label>
                                                <textarea
                                                    className="form-control"
                                                    id="edit-summary"
                                                    name="summary"
                                                    rows="4"
                                                    value={bookForm.summary}
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="edit-coverImage" className="form-label">Portada del libro</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="edit-coverImage"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                <small className="text-muted d-block mt-1">Dejar en blanco para mantener la imagen actual</small>
                                                {isUploading && (
                                                    <div className="mt-2">
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{ width: `${uploadProgress}%` }}
                                                                aria-valuenow={uploadProgress}
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            >
                                                                {uploadProgress}%
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="cover-preview mb-3">
                                                {previewImage ? (
                                                    <img
                                                        src={previewImage}
                                                        alt="Vista previa de portada"
                                                        className="img-thumbnail"
                                                        style={{ maxHeight: "250px", width: "100%", objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <div className="no-cover-placeholder rounded" style={{ height: "250px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <span className="text-muted">Sin portada</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary" disabled={isUploading}>
                                        {isUploading ? 'Actualizando...' : 'Actualizar Libro'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para confirmar eliminación */}
            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirmar Eliminación</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro que deseas eliminar el libro <strong>{selectedBook?.title}</strong>?</p>
                                <p className="text-danger"><strong>Esta acción no se puede deshacer.</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteBook}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para ver reviews */}
            <ViewReviewsModal
                show={showReviewsModal}
                onClose={() => {
                    setShowReviewsModal(false);
                    setSelectedBook(null);
                }}
                book={selectedBook}
                reviews={store.currentBookReviews}
                isLoading={store.isLoading}
                currentUser={store.user}
            />

            {/* Overlay oscuro para los modales */}
            {(showAddModal || showEditModal || showDeleteModal || showReviewsModal) && (
                <div className="modal-backdrop fade show"></div>
            )}

            {/* Componente de mensaje */}
            <MessageAlert />
        </div>
    );
};