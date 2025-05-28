import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Help = () => {
    const [activeCategory, setActiveCategory] = useState('empezar');
    const [searchTerm, setSearchTerm] = useState('');

    const helpCategories = {
        empezar: {
            title: "Primeros Pasos",
            icon: "fa-play-circle",
            color: "primary",
            faqs: [
                {
                    question: "¿Cómo creo mi cuenta?",
                    answer: "Para crear tu cuenta, haz clic en 'Registro' en la parte superior derecha, ingresa tu email y contraseña. Recibirás un mensaje de confirmación inmediatamente."
                },
                {
                    question: "¿Es gratis usar Mi Biblioteca Personal?",
                    answer: "Sí, Mi Biblioteca Personal es completamente gratuito. Puedes agregar libros ilimitados, explorar nuestra biblioteca digital y usar todas las funciones sin costo alguno."
                },
                {
                    question: "¿Cómo agrego mi primer libro?",
                    answer: "Ve a 'Mi Biblioteca', haz clic en 'Agregar Libro', completa el formulario con título, autor y otros detalles opcionales. Puedes subir una imagen de portada también."
                },
                {
                    question: "¿Puedo usar la aplicación en mi teléfono?",
                    answer: "Absolutamente. Mi Biblioteca Personal tiene un diseño responsivo que funciona perfectamente en computadoras, tablets y teléfonos móviles."
                }
            ]
        },
        biblioteca: {
            title: "Gestión de Biblioteca",
            icon: "fa-book",
            color: "success",
            faqs: [
                {
                    question: "¿Cómo organizo mis libros por categorías?",
                    answer: "Al agregar o editar un libro, puedes especificar el género y la categoría. Luego usa los filtros en tu biblioteca para ver libros por categoría específica."
                },
                {
                    question: "¿Puedo editar la información de mis libros?",
                    answer: "Sí, pasa el cursor sobre cualquier libro en tu biblioteca y haz clic en el ícono de editar. Puedes modificar toda la información incluyendo la portada."
                },
                {
                    question: "¿Cómo elimino un libro de mi biblioteca?",
                    answer: "En tu biblioteca personal, pasa el cursor sobre el libro y haz clic en el ícono de eliminar (basurero). Se te pedirá confirmación antes de eliminar definitivamente."
                },
                {
                    question: "¿Hay límite en la cantidad de libros que puedo agregar?",
                    answer: "No hay límite. Puedes agregar tantos libros como desees a tu biblioteca personal. Todo se almacena de forma segura en la nube."
                }
            ]
        },
        busqueda: {
            title: "Búsqueda y Filtros",
            icon: "fa-search",
            color: "info",
            faqs: [
                {
                    question: "¿Cómo busco libros específicos?",
                    answer: "Usa la barra de búsqueda en la parte superior. Puedes buscar por título, autor o cualquier palabra clave. La búsqueda es instantánea y encuentra coincidencias parciales."
                },
                {
                    question: "¿Qué filtros están disponibles?",
                    answer: "Puedes filtrar por autor, género y categoría. También puedes combinar múltiples filtros para encontrar exactamente lo que buscas."
                },
                {
                    question: "¿Cómo encuentro libros de dominio público?",
                    answer: "Ve a la sección 'Explorar' donde encontrarás miles de libros clásicos de dominio público de Project Gutenberg, todos gratuitos para leer."
                },
                {
                    question: "¿Los filtros funcionan en tiempo real?",
                    answer: "Sí, todos los filtros se aplican instantáneamente sin necesidad de recargar la página. Los resultados se actualizan mientras escribes."
                }
            ]
        },
        social: {
            title: "Funciones Sociales",
            icon: "fa-users",
            color: "warning",
            faqs: [
                {
                    question: "¿Cómo escribo una reseña?",
                    answer: "Ve a 'Otros Libros', encuentra un libro que hayas leído y haz clic en el ícono de reseña. Puedes escribir tu opinión y dar una calificación del 1 al 5."
                },
                {
                    question: "¿Puedo ver las bibliotecas de otros usuarios?",
                    answer: "Sí, en la sección 'Otros Libros' puedes explorar las bibliotecas públicas de otros usuarios y descubrir nuevas lecturas."
                },
                {
                    question: "¿Cómo marco libros como favoritos?",
                    answer: "Haz clic en el ícono de corazón en cualquier libro para agregarlo a tu lista de favoritos. Puedes acceder a esta lista desde tu perfil."
                },
                {
                    question: "¿Puedo hacer privada mi biblioteca?",
                    answer: "Por defecto, solo tu biblioteca personal es privada. Los demás usuarios pueden ver qué libros has marcado como públicos, pero no tu biblioteca personal completa."
                }
            ]
        },
        tecnico: {
            title: "Soporte Técnico",
            icon: "fa-cog",
            color: "danger",
            faqs: [
                {
                    question: "¿Qué hago si olvidé mi contraseña?",
                    answer: "Actualmente estamos implementando la recuperación de contraseña. Por ahora, puedes crear una nueva cuenta o contactarnos para ayuda."
                },
                {
                    question: "¿Por qué no puedo subir una imagen de portada?",
                    answer: "Asegúrate de que la imagen sea menor a 5MB y en formato JPG, PNG o GIF. Si el problema persiste, intenta con una imagen más pequeña."
                },
                {
                    question: "La página se ve mal en mi dispositivo",
                    answer: "Intenta refrescar la página o limpiar el caché de tu navegador. Si el problema continúa, asegúrate de estar usando un navegador actualizado."
                },
                {
                    question: "¿Mis datos están seguros?",
                    answer: "Sí, utilizamos encriptación SSL, autenticación JWT y almacenamos datos en servidores seguros de AWS. Tu información está protegida."
                }
            ]
        }
    };

    const currentCategory = helpCategories[activeCategory];

    // Filtrar FAQs por término de búsqueda
    const filteredFAQs = currentCategory.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container my-5">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="display-4 text-primary mb-3">
                    <i className="fa-solid fa-question-circle me-3"></i>
                    Centro de Ayuda
                </h1>
                <p className="lead text-white-50">
                    Encuentra respuestas rápidas a las preguntas más frecuentes
                </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="row justify-content-center mb-5">
                <div className="col-lg-6">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-transparent border-primary">
                            <i className="fa-solid fa-search text-primary"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control bg-transparent border-primary text-white"
                            placeholder="Busca tu pregunta aquí..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ borderLeft: 'none' }}
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="nav nav-pills nav-fill flex-column flex-sm-row" role="tablist">
                        {Object.entries(helpCategories).map(([key, category]) => (
                            <button
                                key={key}
                                className={`nav-link mb-2 mb-sm-0 ${activeCategory === key ? 'active' : ''}`}
                                onClick={() => setActiveCategory(key)}
                                style={{
                                    backgroundColor: activeCategory === key ? `var(--bs-${category.color})` : 'transparent',
                                    borderColor: `var(--bs-${category.color})`,
                                    color: activeCategory === key ? 'white' : `var(--bs-${category.color})`,
                                    border: `2px solid var(--bs-${category.color})`,
                                    margin: '0 3px'
                                }}
                            >
                                <i className={`fa-solid ${category.icon} me-2`}></i>
                                <span className="d-none d-md-inline">{category.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card bg-transparent border-0 shadow-lg">
                        <div className={`card-header bg-${currentCategory.color} text-white py-3`}>
                            <h2 className="mb-0 text-center">
                                <i className={`fa-solid ${currentCategory.icon} me-2`}></i>
                                {currentCategory.title}
                            </h2>
                        </div>
                        <div className="card-body p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            {filteredFAQs.length > 0 ? (
                                <div className="accordion" id="faqAccordion">
                                    {filteredFAQs.map((faq, index) => (
                                        <div key={index} className="accordion-item mb-3 bg-transparent border-light">
                                            <h3 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed bg-transparent text-white border-0"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#faq${index}`}
                                                    aria-expanded="false"
                                                    style={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                                                        borderRadius: '5px'
                                                    }}
                                                >
                                                    <i className={`fa-solid fa-question-circle text-${currentCategory.color} me-2`}></i>
                                                    {faq.question}
                                                </button>
                                            </h3>
                                            <div
                                                id={`faq${index}`}
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#faqAccordion"
                                            >
                                                <div className="accordion-body bg-transparent">
                                                    <p className="mb-0 text-white-50">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="fa-solid fa-search fa-3x text-white-50 mb-3"></i>
                                    <h4 className="text-white">No se encontraron resultados</h4>
                                    <p className="text-white-50">
                                        Intenta con otros términos de búsqueda o explora otras categorías.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="row mt-5">
                <div className="col-12">
                    <h3 className="text-center text-primary mb-4">
                        <i className="fa-solid fa-rocket me-2"></i>
                        Enlaces Rápidos
                    </h3>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="card bg-transparent border-primary h-100">
                                <div className="card-body text-center">
                                    <i className="fa-solid fa-play-circle fa-2x text-primary mb-3"></i>
                                    <h6 className="text-white">Tutorial Rápido</h6>
                                    <p className="card-text small text-white-50">Aprende lo básico en 5 minutos</p>
                                    <Link to="/features" className="btn btn-outline-primary btn-sm">
                                        Ver Tutorial
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card bg-transparent border-success h-100">
                                <div className="card-body text-center">
                                    <i className="fa-solid fa-book fa-2x text-success mb-3"></i>
                                    <h6 className="text-white">Guía Completa</h6>
                                    <p className="card-text small text-white-50">Manual detallado de funciones</p>
                                    <Link to="/features" className="btn btn-outline-success btn-sm">
                                        Leer Guía
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card bg-transparent border-info h-100">
                                <div className="card-body text-center">
                                    <i className="fa-solid fa-video fa-2x text-info mb-3"></i>
                                    <h6 className="text-white">Videos Tutorial</h6>
                                    <p className="card-text small text-white-50">Aprende viendo ejemplos</p>
                                    <button className="btn btn-outline-info btn-sm" disabled>
                                        Próximamente
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card bg-transparent border-warning h-100">
                                <div className="card-body text-center">
                                    <i className="fa-solid fa-comments fa-2x text-warning mb-3"></i>
                                    <h6 className="text-white">Comunidad</h6>
                                    <p className="card-text small text-white-50">Conecta con otros usuarios</p>
                                    <button className="btn btn-outline-warning btn-sm" disabled>
                                        Próximamente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips y Trucos */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card bg-transparent border-secondary">
                        <div className="card-header bg-secondary text-white">
                            <h3 className="mb-0 text-center">
                                <i className="fa-solid fa-lightbulb me-2"></i>
                                Tips y Trucos
                            </h3>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <i className="fa-solid fa-star text-warning fa-lg me-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="text-white">Organización Eficiente</h6>
                                            <p className="text-white-50 small">
                                                Usa categorías consistentes como "Ficción", "No Ficción", "Biografías"
                                                para mantener tu biblioteca organizada.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <i className="fa-solid fa-search text-info fa-lg me-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="text-white">Búsqueda Rápida</h6>
                                            <p className="text-white-50 small">
                                                Usa palabras clave cortas en la búsqueda. Por ejemplo, busca "García"
                                                en lugar de "Gabriel García Márquez".
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <i className="fa-solid fa-heart text-danger fa-lg me-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="text-white">Lista de Favoritos</h6>
                                            <p className="text-white-50 small">
                                                Marca libros como favoritos para crear tu lista de recomendaciones
                                                personales y acceder rápidamente a ellos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <i className="fa-solid fa-users text-success fa-lg me-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="text-white">Reseñas Útiles</h6>
                                            <p className="text-white-50 small">
                                                Escribe reseñas detalladas y honestas. Ayudarás a otros lectores
                                                a descubrir grandes libros.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-5">
                <div className="card bg-primary text-white">
                    <div className="card-body py-4">
                        <h4>¿No encontraste lo que buscabas?</h4>
                        <p className="mb-3">
                            Estamos constantemente mejorando nuestra documentación y agregando nuevas funcionalidades.
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Link to="/about" className="btn btn-light">
                                <i className="fa-solid fa-info-circle me-2"></i>
                                Sobre Nosotros
                            </Link>
                            <Link to="/terms" className="btn btn-outline-light">
                                <i className="fa-solid fa-file-contract me-2"></i>
                                Términos y Condiciones
                            </Link>
                            <Link to="/" className="btn btn-outline-light">
                                <i className="fa-solid fa-home me-2"></i>
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};