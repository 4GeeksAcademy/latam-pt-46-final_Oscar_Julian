import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      await actions.validateToken();
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleStartClick = () => {
    if (store.isAuthenticated) {
      navigate("/welcome");
    } else {
      navigate("/signup");
    }
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="loading-indicator">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '100px 0' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6">
              <div className="hero-text fade-in">
                <h1 className="display-3 text-primary mb-4">Tu Biblioteca Personal</h1>
                <p className="lead text-white-50 mb-4">
                  Organiza tu colección de libros, registra tus lecturas y
                  descubre nuevas recomendaciones en un solo lugar.
                </p>
                <div className="hero-buttons">
                  <button
                    className="btn btn-primary btn-lg me-3 slide-up"
                    onClick={handleStartClick}
                  >
                    <i className="fa-solid fa-rocket me-2"></i>
                    {store.isAuthenticated ? 'Ir a Biblioteca' : 'Comenzar'}
                  </button>
                  {!store.isAuthenticated && (
                    <button
                      className="btn btn-outline-light btn-lg"
                      onClick={() => navigate("/login")}
                    >
                      <i className="fa-solid fa-sign-in-alt me-2"></i>
                      Iniciar Sesión
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="hero-image fade-in">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Biblioteca Personal"
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features-section" className="features-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="text-primary mb-3">Características principales</h2>
            <p className="lead text-white-50">
              Todo lo que necesitas para organizar tu mundo literario
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card bg-transparent border-primary text-center p-4 h-100 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-book fa-3x text-primary"></i>
                  </div>
                  <h3 className="text-white mb-3">Catálogo completo</h3>
                  <p className="text-white-50">
                    Registra todos tus libros con detalles como autor, editorial,
                    género y fecha de publicación.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-transparent border-success text-center p-4 h-100 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-bookmark fa-3x text-success"></i>
                  </div>
                  <h3 className="text-white mb-3">Manejo de Favoritos</h3>
                  <p className="text-white-50">
                    Marca tus libros como favoritos y organizalos
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-transparent border-warning text-center p-4 h-100 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-star fa-3x text-warning"></i>
                  </div>
                  <h3 className="text-white mb-3">Reseñas personales</h3>
                  <p className="text-white-50">
                    Escribe tus reseñas y califica tus lecturas para recordar tus
                    impresiones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works-section" className="how-it-works-section py-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="text-primary mb-3">Cómo funciona</h2>
            <p className="lead text-white-50">
              Organizar tu biblioteca personal nunca ha sido tan fácil
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Proceso de uso"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <div className="steps">
                <div className="step mb-4 slide-in-right d-flex align-items-start">
                  <div className="step-number bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    1
                  </div>
                  <div className="step-content">
                    <h3 className="text-white">Crea tu cuenta</h3>
                    <p className="text-white-50">
                      Regístrate gratis y configura tu perfil de lector en
                      segundos.
                    </p>
                  </div>
                </div>
                <div className="step mb-4 slide-in-right d-flex align-items-start">
                  <div className="step-number bg-success text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    2
                  </div>
                  <div className="step-content">
                    <h3 className="text-white">Añade tus libros</h3>
                    <p className="text-white-50">
                      Agrega manualmente tus libros
                    </p>
                  </div>
                </div>
                <div className="step mb-4 slide-in-right d-flex align-items-start">
                  <div className="step-number bg-info text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    3
                  </div>
                  <div className="step-content">
                    <h3 className="text-white">Organiza tu colección</h3>
                    <p className="text-white-50">
                      Crea estanterías virtuales y organiza tus libros por
                      categorías, genero y mas.
                    </p>
                  </div>
                </div>
                <div className="step slide-in-right d-flex align-items-start">
                  <div className="step-number bg-warning text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    4
                  </div>
                  <div className="step-content">
                    <h3 className="text-white">Disfruta y comparte</h3>
                    <p className="text-white-50">
                      Consulta tu biblioteca desde cualquier dispositivo y
                      comparte tus lecturas con amigos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="testimonials-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="text-primary mb-3">Lo que dicen nuestros usuarios</h2>
            <p className="lead text-white-50">
              Explora cómo MiBiblioteca ha cambiado sus experiencias de lectura
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card bg-transparent border-info p-4 h-100 shadow-sm">
                <div className="card-body">
                  <div className="testimonial-content">
                    <p className="text-white-50 mb-3">
                      "MiBiblioteca me ha permitido organizar mi extensa colección
                      de libros de manera eficiente. Ahora puedo encontrar
                      cualquier título en segundos."
                    </p>
                  </div>
                  <div className="testimonial-author d-flex align-items-center mt-3">
                    <div className="testimonial-avatar me-3">
                      <img
                        src="https://randomuser.me/api/portraits/men/41.jpg"
                        alt="Usuario"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                    <div>
                      <h5 className="mb-0 text-white">Carlos Ruiz</h5>
                      <small className="text-white-50">Profesor de Literatura</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-transparent border-success p-4 h-100 shadow-sm">
                <div className="card-body">
                  <div className="testimonial-content">
                    <p className="text-white-50 mb-3">
                      "Esta aplicación ha revolucionado mi hábito de lectura. El
                      seguimiento de mis lecturas me motiva a leer más y a
                      descubrir nuevos autores."
                    </p>
                  </div>
                  <div className="testimonial-author d-flex align-items-center mt-3">
                    <div className="testimonial-avatar me-3">
                      <img
                        src="https://randomuser.me/api/portraits/women/65.jpg"
                        alt="Usuario"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                    <div>
                      <h5 className="mb-0 text-white">Laura Gómez</h5>
                      <small className="text-white-50">Ávida lectora</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-transparent border-warning p-4 h-100 shadow-sm">
                <div className="card-body">
                  <div className="testimonial-content">
                    <p className="text-white-50 mb-3">
                      "La función de reseñas personales es genial. Puedo recordar
                      mis impresiones sobre cada libro y compartirlas con mi club
                      de lectura."
                    </p>
                  </div>
                  <div className="testimonial-author d-flex align-items-center mt-3">
                    <div className="testimonial-avatar me-3">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Usuario"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                    <div>
                      <h5 className="mb-0 text-white">Miguel Sánchez</h5>
                      <small className="text-white-50">Escritor</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary mb-3">Nuestro Impacto</h2>
            <p className="lead text-white-50">
              Únete a una comunidad creciente de lectores apasionados
            </p>
          </div>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-primary h-100 p-3">
                <div className="card-body">
                  <i className="fa-solid fa-users fa-3x text-primary mb-3"></i>
                  <div className="display-5 fw-bold text-primary">1,000+</div>
                  <p className="text-white-50 mb-0">Usuarios Activos</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-success h-100 p-3">
                <div className="card-body">
                  <i className="fa-solid fa-book fa-3x text-success mb-3"></i>
                  <div className="display-5 fw-bold text-success">50,000+</div>
                  <p className="text-white-50 mb-0">Libros Catalogados</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-warning h-100 p-3">
                <div className="card-body">
                  <i className="fa-solid fa-star fa-3x text-warning mb-3"></i>
                  <div className="display-5 fw-bold text-warning">5,000+</div>
                  <p className="text-white-50 mb-0">Reseñas Escritas</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-info h-100 p-3">
                <div className="card-body">
                  <i className="fa-solid fa-globe fa-3x text-info mb-3"></i>
                  <div className="display-5 fw-bold text-info">15+</div>
                  <p className="text-white-50 mb-0">Países Representados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="card bg-primary text-white shadow-lg">
            <div className="card-body text-center py-5">
              <h2 className="mb-4">¿Listo para organizar tu biblioteca?</h2>
              <p className="lead mb-4">
                Únete a miles de lectores que ya disfrutan de una experiencia de
                lectura más organizada y enriquecedora.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button
                  onClick={handleGetStarted}
                  className="btn btn-light btn-lg"
                >
                  <i className="fa-solid fa-rocket me-2"></i>
                  Crear cuenta gratis
                </button>
                <button
                  onClick={() => navigate("/features")}
                  className="btn btn-outline-light btn-lg"
                >
                  <i className="fa-solid fa-info-circle me-2"></i>
                  Conocer más
                </button>
              </div>
              <p className="mt-3 mb-0">
                <small>No se requiere tarjeta de crédito</small>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};