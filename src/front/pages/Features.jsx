import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Features = () => {
    const [activeCategory, setActiveCategory] = useState('biblioteca');

    const featureCategories = {
        biblioteca: {
            title: "Gestión de Biblioteca",
            icon: "fa-book",
            color: "primary",
            features: [
                {
                    icon: "fa-plus-circle",
                    title: "Agregar Libros Fácilmente",
                    description: "Añade libros a tu biblioteca personal con información completa: título, autor, género, categoría y resumen.",
                    benefits: ["Formulario intuitivo", "Carga de imágenes", "Validación automática", "Guardado en la nube"]
                },
                {
                    icon: "fa-edit",
                    title: "Edición Completa",
                    description: "Modifica la información de tus libros en cualquier momento para mantener tu biblioteca actualizada.",
                    benefits: ["Edición en tiempo real", "Historial de cambios", "Backup automático", "Sincronización instantánea"]
                },
                {
                    icon: "fa-trash-alt",
                    title: "Gestión Avanzada",
                    description: "Organiza tu biblioteca eliminando libros que ya no necesites con confirmaciones de seguridad.",
                    benefits: ["Eliminación segura", "Confirmación doble", "Recuperación temporal", "Estadísticas actualizadas"]
                }
            ]
        },
        exploracion: {
            title: "Exploración y Descubrimiento",
            icon: "fa-compass",
            color: "success",
            features: [
                {
                    icon: "fa-search",
                    title: "Búsqueda Inteligente",
                    description: "Encuentra libros usando nuestro motor de búsqueda que incluye título, autor y contenido.",
                    benefits: ["Búsqueda instantánea", "Filtros avanzados", "Sugerencias automáticas", "Resultados relevantes"]
                },
                {
                    icon: "fa-filter",
                    title: "Filtros Avanzados",
                    description: "Refina tu búsqueda usando filtros por género, autor, categoría y más criterios específicos.",
                    benefits: ["Múltiples filtros", "Combinación flexible", "Resultados precisos", "Guardado de preferencias"]
                },
                {
                    icon: "fa-globe",
                    title: "Biblioteca Global",
                    description: "Explora miles de libros de dominio público de la biblioteca digital global de Project Gutenberg.",
                    benefits: ["50,000+ títulos", "Acceso gratuito", "Múltiples idiomas", "Clásicos universales"]
                }
            ]
        },
        social: {
            title: "Interacción Social",
            icon: "fa-users",
            color: "info",
            features: [
                {
                    icon: "fa-star",
                    title: "Sistema de Reseñas",
                    description: "Escribe y lee reseñas detalladas de libros para compartir experiencias con otros lectores.",
                    benefits: ["Reseñas detalladas", "Sistema de calificación", "Comentarios públicos", "Moderación automática"]
                },
                {
                    icon: "fa-share",
                    title: "Bibliotecas Compartidas",
                    description: "Descubre qué están leyendo otros usuarios y comparte tu biblioteca con la comunidad.",
                    benefits: ["Perfiles públicos", "Bibliotecas visibles", "Recomendaciones personalizadas", "Red de lectores"]
                },
                {
                    icon: "fa-heart",
                    title: "Lista de Favoritos",
                    description: "Marca libros como favoritos para crear tu lista personal de lecturas recomendadas.",
                    benefits: ["Acceso rápido", "Organización personal", "Compartir favoritos", "Sincronización multi-dispositivo"]
                }
            ]
        },
        tecnologia: {
            title: "Tecnología y Seguridad",
            icon: "fa-cog",
            color: "warning",
            features: [
                {
                    icon: "fa-cloud",
                    title: "Almacenamiento en la Nube",
                    description: "Todos tus datos están seguros en la nube con AWS S3, accesibles desde cualquier dispositivo.",
                    benefits: ["Backup automático", "Acceso universal", "Seguridad garantizada", "Escalabilidad infinita"]
                },
                {
                    icon: "fa-shield-alt",
                    title: "Seguridad Avanzada",
                    description: "Protección de datos con encriptación JWT y autenticación segura para proteger tu información.",
                    benefits: ["Encriptación de datos", "Sesiones seguras", "Protección HTTPS", "Autenticación robusta"]
                },
                {
                    icon: "fa-mobile-alt",
                    title: "Diseño Responsivo",
                    description: "Disfruta de la misma experiencia en computadoras, tablets y teléfonos móviles.",
                    benefits: ["Compatible con todos los dispositivos", "Interfaz adaptativa", "Rendimiento optimizado", "Experiencia consistente"]
                }
            ]
        }
    };

    const currentCategory = featureCategories[activeCategory];

    return (
        <div className="container my-5">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="display-4 text-primary mb-3">
                    <i className="fa-solid fa-rocket me-3"></i>
                    Funcionalidades
                </h1>
                <p className="lead text-white-50">
                    Descubre todas las características que hacen de Mi Biblioteca Personal
                    la mejor plataforma para gestionar tus lecturas
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="nav nav-pills nav-fill" role="tablist">
                        {Object.entries(featureCategories).map(([key, category]) => (
                            <button
                                key={key}
                                className={`nav-link ${activeCategory === key ? 'active' : ''}`}
                                onClick={() => setActiveCategory(key)}
                                style={{
                                    backgroundColor: activeCategory === key ? `var(--bs-${category.color})` : 'transparent',
                                    borderColor: `var(--bs-${category.color})`,
                                    color: activeCategory === key ? 'white' : `var(--bs-${category.color})`,
                                    border: `2px solid var(--bs-${category.color})`,
                                    margin: '0 5px'
                                }}
                            >
                                <i className={`fa-solid ${category.icon} me-2`}></i>
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature Content */}
            <div className="row">
                <div className="col-12">
                    <div className="card bg-transparent border-0 shadow-lg">
                        <div className={`card-header bg-${currentCategory.color} text-white py-3`}>
                            <h2 className="mb-0 text-center">
                                <i className={`fa-solid ${currentCategory.icon} me-2`}></i>
                                {currentCategory.title}
                            </h2>
                        </div>
                        <div className="card-body p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="row">
                                {currentCategory.features.map((feature, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                                        <div className="card bg-transparent border-light shadow-sm h-100" style={{ borderColor: `var(--bs-${currentCategory.color}) !important` }}>
                                            <div className="card-body text-center p-4">
                                                <div className={`mb-3 text-${currentCategory.color}`}>
                                                    <i className={`fa-solid ${feature.icon} fa-3x`}></i>
                                                </div>
                                                <h5 className={`card-title text-white mb-3`}>
                                                    {feature.title}
                                                </h5>
                                                <p className="card-text text-white-50 mb-3">
                                                    {feature.description}
                                                </p>
                                                <div className="mt-3">
                                                    <h6 className="text-white">Beneficios:</h6>
                                                    <ul className="list-unstyled small text-white-50">
                                                        {feature.benefits.map((benefit, idx) => (
                                                            <li key={idx} className="mb-1">
                                                                <i className={`fa-solid fa-check text-${currentCategory.color} me-2`}></i>
                                                                {benefit}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparación de Planes */}
            <div className="row mt-5">
                <div className="col-12">
                    <h2 className="text-center text-primary mb-4">
                        <i className="fa-solid fa-balance-scale me-2"></i>
                        ¿Por Qué Elegir Mi Biblioteca Personal?
                    </h2>
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-transparent border-success h-100">
                                <div className="card-header bg-success text-white text-center">
                                    <h4 className="mb-0">
                                        <i className="fa-solid fa-thumbs-up me-2"></i>
                                        Con Nosotros
                                    </h4>
                                </div>
                                <div className="card-body" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-check-circle text-success me-3 mt-1"></i>
                                            <span className="text-white">Organización automática de tu biblioteca</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-check-circle text-success me-3 mt-1"></i>
                                            <span className="text-white">Acceso a 50,000+ libros gratuitos</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-check-circle text-success me-3 mt-1"></i>
                                            <span className="text-white">Comunidad activa de lectores</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-check-circle text-success me-3 mt-1"></i>
                                            <span className="text-white">Sincronización en todos tus dispositivos</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-check-circle text-success me-3 mt-1"></i>
                                            <span className="text-white">Sistema avanzado de reseñas</span>
                                        </li>
                                        <li className="mb-0 d-flex align-items-start">
                                            <i className="fa-solid fa-check-circle text-success me-3 mt-1"></i>
                                            <span className="text-white">Backup automático en la nube</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-transparent border-danger h-100">
                                <div className="card-header bg-danger text-white text-center">
                                    <h4 className="mb-0">
                                        <i className="fa-solid fa-thumbs-down me-2"></i>
                                        Sin Nosotros
                                    </h4>
                                </div>
                                <div className="card-body" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-times-circle text-danger me-3 mt-1"></i>
                                            <span className="text-white">Libros dispersos sin organización</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-times-circle text-danger me-3 mt-1"></i>
                                            <span className="text-white">Dificultad para encontrar nuevas lecturas</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-times-circle text-danger me-3 mt-1"></i>
                                            <span className="text-white">Sin recomendaciones personalizadas</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-times-circle text-danger me-3 mt-1"></i>
                                            <span className="text-white">Pérdida de datos sin backup</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fa-solid fa-times-circle text-danger me-3 mt-1"></i>
                                            <span className="text-white">Sin registro de lecturas pasadas</span>
                                        </li>
                                        <li className="mb-0 d-flex align-items-start">
                                            <i className="fa-solid fa-times-circle text-danger me-3 mt-1"></i>
                                            <span className="text-white">Aislamiento de otros lectores</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proceso de Uso */}
            <div className="row mt-5">
                <div className="col-12">
                    <h2 className="text-center text-primary mb-5">
                        <i className="fa-solid fa-route me-2"></i>
                        Cómo Empezar en 4 Simples Pasos
                    </h2>
                    <div className="row">
                        <div className="col-md-3 text-center mb-4">
                            <div className="position-relative">
                                <div className="bg-primary text-white rounded-circle mx-auto mb-3"
                                    style={{ width: '80px', height: '80px', lineHeight: '80px', fontSize: '2rem' }}>
                                    1
                                </div>
                                <h5 className="text-primary">Registro</h5>
                                <p className="text-white-50 small">
                                    Crea tu cuenta gratuita en menos de 2 minutos
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center mb-4">
                            <div className="position-relative">
                                <div className="bg-success text-white rounded-circle mx-auto mb-3"
                                    style={{ width: '80px', height: '80px', lineHeight: '80px', fontSize: '2rem' }}>
                                    2
                                </div>
                                <h5 className="text-success">Explorar</h5>
                                <p className="text-white-50 small">
                                    Descubre miles de libros en nuestra biblioteca digital
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center mb-4">
                            <div className="position-relative">
                                <div className="bg-info text-white rounded-circle mx-auto mb-3"
                                    style={{ width: '80px', height: '80px', lineHeight: '80px', fontSize: '2rem' }}>
                                    3
                                </div>
                                <h5 className="text-info">Organizar</h5>
                                <p className="text-white-50 small">
                                    Agrega tus libros personales y crea tu biblioteca
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center mb-4">
                            <div className="position-relative">
                                <div className="bg-warning text-white rounded-circle mx-auto mb-3"
                                    style={{ width: '80px', height: '80px', lineHeight: '80px', fontSize: '2rem' }}>
                                    4
                                </div>
                                <h5 className="text-warning">Compartir</h5>
                                <p className="text-white-50 small">
                                    Conecta con otros lectores y comparte reseñas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-5 pt-4">
                <div className="card bg-primary text-white">
                    <div className="card-body py-5">
                        <h2 className="mb-4">¿Listo para Transformar tu Experiencia de Lectura?</h2>
                        <p className="lead mb-4">
                            Únete a miles de lectores que ya disfrutan de una biblioteca perfectamente organizada
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Link to="/signup" className="btn btn-light btn-lg">
                                <i className="fa-solid fa-rocket me-2"></i>
                                Comenzar Gratis Ahora
                            </Link>
                            <Link to="/about" className="btn btn-outline-light btn-lg">
                                <i className="fa-solid fa-info-circle me-2"></i>
                                Conoce Más
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};