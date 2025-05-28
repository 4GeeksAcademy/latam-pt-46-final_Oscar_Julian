import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Stats = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalReviews: 0,
        totalFavorites: 0,
        genreBreakdown: {},
        recentActivity: [],
        readingGoal: 50,
        averageRating: 0
    });

    // Verificar autenticación y cargar datos
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            await actions.validateToken();
            if (store.isAuthenticated) {
                await loadUserStats();
            }
            setLoading(false);
        };

        checkAuthAndLoadData();
    }, []);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!loading && !store.isAuthenticated) {
            navigate("/login");
        }
    }, [store.isAuthenticated, loading, navigate]);

    const loadUserStats = async () => {
        try {
            // Cargar datos existentes
            await actions.getPersonalBooks();
            await actions.getFavorites();

            // Calcular estadísticas
            const personalBooks = store.personalBooks || [];
            const favorites = store.favorites || [];

            // Análisis por género
            const genreCount = {};
            personalBooks.forEach(book => {
                const genre = book.genre || 'Sin clasificar';
                genreCount[genre] = (genreCount[genre] || 0) + 1;
            });

            // Actividad reciente simulada (podrías obtener esto de una API real)
            const recentActivity = [
                { action: 'Agregó', book: 'Nuevo libro', date: new Date().toLocaleDateString() },
                { action: 'Reseñó', book: 'Libro favorito', date: new Date(Date.now() - 86400000).toLocaleDateString() },
                { action: 'Marcó como favorito', book: 'Gran lectura', date: new Date(Date.now() - 172800000).toLocaleDateString() }
            ];

            setStats({
                totalBooks: personalBooks.length,
                totalReviews: store.reviews?.length || 0,
                totalFavorites: favorites.length,
                genreBreakdown: genreCount,
                recentActivity: recentActivity,
                readingGoal: 50,
                averageRating: 4.2
            });

        } catch (error) {
            actions.setMessage("Error al cargar estadísticas");
        }
    };

    // Calcular progreso hacia meta de lectura
    const readingProgress = Math.min((stats.totalBooks / stats.readingGoal) * 100, 100);

    // Obtener género más leído
    const topGenre = Object.keys(stats.genreBreakdown).length > 0
        ? Object.entries(stats.genreBreakdown).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        : 'Sin datos';

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

    // No mostrar nada si no está autenticado
    if (!store.isAuthenticated) {
        return null;
    }

    return (
        <div className="container my-5">
            {/* Header */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="display-4 text-primary mb-2">
                                <i className="fa-solid fa-chart-bar me-3"></i>
                                Mi Dashboard
                            </h1>
                            <p className="lead text-white-50">
                                Resumen de tu actividad lectora y estadísticas personales
                            </p>
                        </div>
                        <div>
                            <Link to="/library" className="btn btn-outline-light btn-lg">
                                <i className="fa-solid fa-arrow-left me-2"></i>
                                Volver a Biblioteca
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas Principales */}
            <div className="row mb-5">
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-transparent border-primary text-white h-100">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-book fa-3x text-primary"></i>
                            </div>
                            <h2 className="mb-1 text-primary">{stats.totalBooks}</h2>
                            <p className="mb-0 text-white-50">Libros en mi Biblioteca</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-transparent border-success text-white h-100">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-star fa-3x text-warning"></i>
                            </div>
                            <h2 className="mb-1 text-success">{stats.totalReviews}</h2>
                            <p className="mb-0 text-white-50">Reseñas Escritas</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-transparent border-danger text-white h-100">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-heart fa-3x text-danger"></i>
                            </div>
                            <h2 className="mb-1 text-danger">{stats.totalFavorites}</h2>
                            <p className="mb-0 text-white-50">Libros Favoritos</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-transparent border-warning text-white h-100">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-trophy fa-3x text-warning"></i>
                            </div>
                            <h2 className="mb-1 text-warning">{stats.averageRating}</h2>
                            <p className="mb-0 text-white-50">Calificación Promedio</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta de Lectura */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card bg-transparent border-primary shadow-lg">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">
                                <i className="fa-solid fa-target me-2"></i>
                                Meta de Lectura 2025
                            </h3>
                        </div>
                        <div className="card-body p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <p className="text-white-50 mb-2">
                                        Progreso hacia tu meta de {stats.readingGoal} libros este año
                                    </p>
                                    <div className="progress mb-3" style={{ height: '20px' }}>
                                        <div
                                            className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            style={{ width: `${readingProgress}%` }}
                                            aria-valuenow={readingProgress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {readingProgress.toFixed(1)}%
                                        </div>
                                    </div>
                                    <p className="small text-white-50">
                                        {stats.totalBooks} de {stats.readingGoal} libros completados
                                        {stats.totalBooks >= stats.readingGoal && (
                                            <span className="text-warning ms-2">
                                                <i className="fa-solid fa-trophy"></i> ¡Meta alcanzada!
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div className="position-relative">
                                        <div
                                            className="rounded-circle bg-primary mx-auto d-flex align-items-center justify-content-center text-white"
                                            style={{ width: '100px', height: '100px' }}
                                        >
                                            <div>
                                                <div className="h4 mb-0">{stats.totalBooks}</div>
                                                <small>libros</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Análisis por Género */}
            <div className="row mb-5">
                <div className="col-lg-6 mb-4">
                    <div className="card bg-transparent border-success shadow-lg h-100">
                        <div className="card-header bg-success text-white">
                            <h4 className="mb-0">
                                <i className="fa-solid fa-chart-pie me-2"></i>
                                Distribución por Género
                            </h4>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            {Object.keys(stats.genreBreakdown).length > 0 ? (
                                <div>
                                    <p className="text-white-50 mb-3">
                                        Tu género favorito es: <strong className="text-success">{topGenre}</strong>
                                    </p>
                                    {Object.entries(stats.genreBreakdown)
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, 5)
                                        .map(([genre, count], index) => {
                                            const percentage = ((count / stats.totalBooks) * 100).toFixed(1);
                                            const colors = ['primary', 'success', 'warning', 'info', 'danger'];
                                            return (
                                                <div key={genre} className="mb-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <span className="text-white">{genre}</span>
                                                        <span className="text-white-50">{count} ({percentage}%)</span>
                                                    </div>
                                                    <div className="progress" style={{ height: '8px' }}>
                                                        <div
                                                            className={`progress-bar bg-${colors[index % colors.length]}`}
                                                            role="progressbar"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fa-solid fa-chart-pie fa-3x text-white-50 mb-3"></i>
                                    <p className="text-white-50">
                                        Agrega libros con géneros para ver estadísticas
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actividad Reciente */}
                <div className="col-lg-6 mb-4">
                    <div className="card bg-transparent border-info shadow-lg h-100">
                        <div className="card-header bg-info text-white">
                            <h4 className="mb-0">
                                <i className="fa-solid fa-clock me-2"></i>
                                Actividad Reciente
                            </h4>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            {stats.recentActivity.length > 0 ? (
                                <div className="timeline">
                                    {stats.recentActivity.map((activity, index) => (
                                        <div key={index} className="d-flex mb-3">
                                            <div className="flex-shrink-0">
                                                <div className="bg-info rounded-circle text-white d-flex align-items-center justify-content-center"
                                                    style={{ width: '40px', height: '40px' }}>
                                                    <i className="fa-solid fa-book-open"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <div className="text-white">
                                                    <strong>{activity.action}</strong> "{activity.book}"
                                                </div>
                                                <small className="text-white-50">{activity.date}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fa-solid fa-clock fa-3x text-white-50 mb-3"></i>
                                    <p className="text-white-50">
                                        Tu actividad aparecerá aquí
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Logros y Badges */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card bg-transparent border-warning shadow-lg">
                        <div className="card-header bg-warning text-dark">
                            <h4 className="mb-0">
                                <i className="fa-solid fa-medal me-2"></i>
                                Logros Desbloqueados
                            </h4>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <div className={`card bg-transparent text-center h-100 ${stats.totalBooks >= 1 ? 'border-success' : 'border-secondary'}`}>
                                        <div className="card-body">
                                            <i className={`fa-solid fa-book fa-2x mb-2 ${stats.totalBooks >= 1 ? 'text-success' : 'text-white-50'}`}></i>
                                            <h6 className="text-white">Primer Libro</h6>
                                            <small className="text-white-50">Agrega tu primer libro</small>
                                            {stats.totalBooks >= 1 && (
                                                <div className="mt-2">
                                                    <span className="badge bg-success">✓ Completado</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className={`card bg-transparent text-center h-100 ${stats.totalBooks >= 10 ? 'border-success' : 'border-secondary'}`}>
                                        <div className="card-body">
                                            <i className={`fa-solid fa-book-open-reader fa-2x mb-2 ${stats.totalBooks >= 10 ? 'text-success' : 'text-white-50'}`}></i>
                                            <h6 className="text-white">Coleccionista</h6>
                                            <small className="text-white-50">10 libros en biblioteca</small>
                                            {stats.totalBooks >= 10 && (
                                                <div className="mt-2">
                                                    <span className="badge bg-success">✓ Completado</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className={`card bg-transparent text-center h-100 ${stats.totalReviews >= 1 ? 'border-success' : 'border-secondary'}`}>
                                        <div className="card-body">
                                            <i className={`fa-solid fa-thumbs-up fa-2x mb-2 ${stats.totalReviews >= 1 ? 'text-warning' : 'text-white-50'}`}></i>
                                            <h6 className="text-white">Crítico</h6>
                                            <small className="text-white-50">Escribe tu primera reseña</small>
                                            {stats.totalReviews >= 1 && (
                                                <div className="mt-2">
                                                    <span className="badge bg-success">✓ Completado</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className={`card bg-transparent text-center h-100 ${stats.totalFavorites >= 5 ? 'border-success' : 'border-secondary'}`}>
                                        <div className="card-body">
                                            <i className={`fa-solid fa-heart fa-2x mb-2 ${stats.totalFavorites >= 5 ? 'text-danger' : 'text-white-50'}`}></i>
                                            <h6 className="text-white">Amante de libros</h6>
                                            <small className="text-white-50">5 libros favoritos</small>
                                            {stats.totalFavorites >= 5 && (
                                                <div className="mt-2">
                                                    <span className="badge bg-success">✓ Completado</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recomendaciones Personalizadas */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card bg-transparent border-secondary shadow-lg">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="mb-0">
                                <i className="fa-solid fa-lightbulb me-2"></i>
                                Recomendaciones Personalizadas
                            </h4>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="card bg-transparent border-primary h-100">
                                        <div className="card-body text-center">
                                            <i className="fa-solid fa-plus-circle fa-2x text-primary mb-2"></i>
                                            <h6 className="text-white">Explora Nuevos Géneros</h6>
                                            <p className="small text-white-50">
                                                Basado en tu preferencia por {topGenre}, te recomendamos explorar géneros relacionados.
                                            </p>
                                            <Link to="/welcome" className="btn btn-outline-primary btn-sm">
                                                Explorar
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card bg-transparent border-success h-100">
                                        <div className="card-body text-center">
                                            <i className="fa-solid fa-users fa-2x text-success mb-2"></i>
                                            <h6 className="text-white">Conecta con Lectores</h6>
                                            <p className="small text-white-50">
                                                Descubre qué están leyendo otros usuarios con gustos similares.
                                            </p>
                                            <Link to="/other-books" className="btn btn-outline-success btn-sm">
                                                Ver Comunidad
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card bg-transparent border-warning h-100">
                                        <div className="card-body text-center">
                                            <i className="fa-solid fa-star fa-2x text-warning mb-2"></i>
                                            <h6 className="text-white">Comparte Más Reseñas</h6>
                                            <p className="small text-white-50">
                                                Tus reseñas ayudan a otros lectores. ¡Comparte tu opinión sobre más libros!
                                            </p>
                                            <Link to="/other-books" className="btn btn-outline-warning btn-sm">
                                                Escribir Reseña
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="row">
                <div className="col-12">
                    <div className="card bg-primary text-white">
                        <div className="card-body text-center py-4">
                            <h4 className="mb-3">Acciones Rápidas</h4>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <Link to="/library" className="btn btn-light btn-lg">
                                    <i className="fa-solid fa-plus me-2"></i>
                                    Agregar Libro
                                </Link>
                                <Link to="/welcome" className="btn btn-outline-light btn-lg">
                                    <i className="fa-solid fa-search me-2"></i>
                                    Explorar Biblioteca
                                </Link>
                                <Link to="/other-books" className="btn btn-outline-light btn-lg">
                                    <i className="fa-solid fa-star me-2"></i>
                                    Escribir Reseña
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};