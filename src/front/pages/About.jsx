import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
    return (
        <div className="container my-5">
            {/* Hero Section */}
            <div className="row align-items-center mb-5">
                <div className="col-lg-6">
                    <h1 className="display-4 text-primary mb-4">
                        <i className="fa-solid fa-users me-3"></i>
                        Sobre Nosotros
                    </h1>
                    <p className="lead text-white-50">
                        Conectando lectores con sus libros favoritos a través de la tecnología
                    </p>
                </div>
                <div className="col-lg-6 text-center">
                    <img
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                        alt="Biblioteca"
                        className="img-fluid rounded-lg shadow-lg"
                        style={{ maxHeight: '400px' }}
                    />
                </div>
            </div>

            {/* Misión y Visión */}
            <div className="row mb-5">
                <div className="col-md-6 mb-4">
                    <div className="card bg-transparent border-primary h-100">
                        <div className="card-body text-center p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="mb-3">
                                <i className="fa-solid fa-bullseye fa-3x text-primary"></i>
                            </div>
                            <h3 className="card-title text-primary">Nuestra Misión</h3>
                            <p className="card-text text-white-50">
                                Democratizar el acceso a la literatura y facilitar la organización
                                personal de bibliotecas digitales, creando una comunidad global de
                                lectores apasionados.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card bg-transparent border-success h-100">
                        <div className="card-body text-center p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="mb-3">
                                <i className="fa-solid fa-eye fa-3x text-success"></i>
                            </div>
                            <h3 className="card-title text-success">Nuestra Visión</h3>
                            <p className="card-text text-white-50">
                                Ser la plataforma líder mundial para la gestión de bibliotecas
                                personales, fomentando el amor por la lectura y el intercambio
                                cultural entre usuarios de todo el mundo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Historia de la Empresa */}
            <div className="card bg-transparent border-primary shadow-lg mb-5">
                <div className="card-header bg-primary text-white text-center py-3">
                    <h2 className="mb-0">
                        <i className="fa-solid fa-book-open me-2"></i>
                        Nuestra Historia
                    </h2>
                </div>
                <div className="card-body p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <div className="row">
                        <div className="col-md-4 text-center mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                                alt="Origen"
                                className="img-fluid rounded-circle shadow"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <h4 className="text-primary mb-3">El Comienzo (2025)</h4>
                            <p className="text-white-50">
                                Mi Biblioteca Personal nació de una necesidad personal: la frustración de no poder
                                organizar eficientemente una extensa colección de libros digitales y físicos.
                                Nuestro fundador, un ávido lector y desarrollador de software, decidió crear una
                                solución que no solo resolviera su problema, sino que ayudara a millones de
                                lectores en todo el mundo.
                            </p>
                            <p className="text-white-50">
                                Lo que comenzó como un proyecto personal se transformó rápidamente en una plataforma
                                robusta que combina la pasión por la literatura con la innovación tecnológica.
                                Desde Costa Rica, hemos construido una herramienta que respeta tanto la tradición
                                de la lectura como las necesidades del lector moderno.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Valores */}
            <div className="mb-5">
                <h2 className="text-center text-primary mb-5">
                    <i className="fa-solid fa-heart me-2"></i>
                    Nuestros Valores
                </h2>
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-universal-access fa-3x text-warning"></i>
                            </div>
                            <h5 className="text-primary">Accesibilidad</h5>
                            <p className="text-white-50 small">
                                Creemos que todos deben tener acceso a la literatura, independientemente
                                de su ubicación o recursos económicos.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-shield-halved fa-3x text-info"></i>
                            </div>
                            <h5 className="text-primary">Privacidad</h5>
                            <p className="text-white-50 small">
                                Respetamos y protegemos la privacidad de nuestros usuarios. Tus datos
                                de lectura son tuyos y solo tuyos.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-lightbulb fa-3x text-success"></i>
                            </div>
                            <h5 className="text-primary">Innovación</h5>
                            <p className="text-white-50 small">
                                Constantemente mejoramos nuestra plataforma con nuevas funcionalidades
                                basadas en las necesidades de nuestra comunidad.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="text-center">
                            <div className="mb-3">
                                <i className="fa-solid fa-handshake fa-3x text-danger"></i>
                            </div>
                            <h5 className="text-primary">Comunidad</h5>
                            <p className="text-white-50 small">
                                Fomentamos una comunidad inclusiva donde los lectores pueden compartir
                                y descubrir nuevas perspectivas literarias.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="card bg-transparent border-primary text-white mb-5">
                <div className="card-body p-5">
                    <h2 className="text-center mb-4">
                        <i className="fa-solid fa-chart-line me-2"></i>
                        Nuestro Impacto
                    </h2>
                    <div className="row text-center">
                        <div className="col-md-3 mb-3">
                            <div className="display-4 fw-bold">1K+</div>
                            <p className="mb-0">Usuarios Activos</p>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="display-4 fw-bold">50K+</div>
                            <p className="mb-0">Libros Catalogados</p>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="display-4 fw-bold">5K+</div>
                            <p className="mb-0">Reseñas Escritas</p>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="display-4 fw-bold">15+</div>
                            <p className="mb-0">Países Representados</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tecnología */}
            <div className="row mb-5">
                <div className="col-lg-6 mb-4">
                    <h3 className="text-primary mb-3">
                        <i className="fa-solid fa-code me-2"></i>
                        Tecnología que Nos Impulsa
                    </h3>
                    <p className="text-white-50">
                        Utilizamos tecnologías modernas y confiables para garantizar una experiencia
                        fluida y segura:
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <ul className="list-unstyled">
                                <li><i className="fa-brands fa-react text-info me-2"></i>React.js</li>
                                <li><i className="fa-brands fa-python text-warning me-2"></i>Flask/Python</li>
                                <li><i className="fa-solid fa-database text-primary me-2"></i>PostgreSQL</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="list-unstyled">
                                <li><i className="fa-brands fa-aws text-orange me-2"></i>AWS S3</li>
                                <li><i className="fa-solid fa-shield text-success me-2"></i>JWT Security</li>
                                <li><i className="fa-brands fa-bootstrap text-purple me-2"></i>Bootstrap</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                        alt="Tecnología"
                        className="img-fluid rounded shadow"
                    />
                </div>
            </div>

            {/* Compromiso Ambiental */}
            <div className="card border-success mb-5">
                <div className="card-header bg-success text-white text-center">
                    <h3 className="mb-0">
                        <i className="fa-solid fa-leaf me-2"></i>
                        Compromiso Ambiental
                    </h3>
                </div>
                <div className="card-body text-dark p-4">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <p>
                                Creemos en la sostenibilidad digital. Al promover las bibliotecas digitales,
                                contribuimos a reducir el consumo de papel y la huella de carbono asociada
                                con la impresión tradicional de libros.
                            </p>
                            <ul>
                                <li>Servidores alimentados con energía renovable</li>
                                <li>Optimización de código para reducir el consumo energético</li>
                                <li>Promoción de libros digitales de dominio público</li>
                                <li>Reducción de residuos mediante la digitalización</li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="fa-solid fa-earth-americas fa-5x text-success"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Llamada a la Acción */}
            <div className="text-center">
                <h2 className="text-primary mb-4">¿Listo para Unirte a Nuestra Comunidad?</h2>
                <p className="lead text-white-50 mb-4">
                    Descubre una nueva forma de organizar y disfrutar tus lecturas
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/signup" className="btn btn-primary btn-lg">
                        <i className="fa-solid fa-user-plus me-2"></i>
                        Crear Cuenta Gratis
                    </Link>
                    <Link to="/features" className="btn btn-outline-light btn-lg">
                        <i className="fa-solid fa-list-ul me-2"></i>
                        Ver Funcionalidades
                    </Link>
                    <Link to="/" className="btn btn-outline-primary btn-lg">
                        <i className="fa-solid fa-home me-2"></i>
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};