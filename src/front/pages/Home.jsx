import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { BackendURL } from "../component/BackendURL";

export const Home = () => {
  const { store, actions, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadMessage = async () => {
    try {
      setLoading(true);
      const backendUrl = store.apiUrl;

      if (!backendUrl) {
        return <BackendURL />;
      }

      const response = await fetch(backendUrl + "/api/hello");
      const data = await response.json();

      if (response.ok) dispatch({ type: "set_hello", payload: data.message });

      return data;
    } catch (error) {
      console.error("Could not fetch message from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  const handleStartClick = () => {
    if (store.isAuthenticated) {
      navigate("/welcome");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6">
              <div className="hero-text fade-in">
                <h1>Tu Biblioteca Personal</h1>
                <p className="lead">
                  Organiza tu colección de libros, registra tus lecturas y
                  descubre nuevas recomendaciones en un solo lugar.
                </p>
                <div className="hero-buttons">
                  <button
                    className="btn btn-primary btn-lg me-3 slide-up"
                    onClick={handleStartClick}
                  >
                    Comenzar
                  </button>
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
      <section className="features-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2>Características principales</h2>
            <p className="lead">
              Todo lo que necesitas para organizar tu mundo literario
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-book fa-3x"></i>
                </div>
                <h3>Catálogo completo</h3>
                <p>
                  Registra todos tus libros con detalles como autor, editorial,
                  género y fecha de publicación.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-bookmark fa-3x"></i>
                </div>
                <h3>Seguimiento de lecturas</h3>
                <p>
                  Marca tus libros como leídos, en progreso o pendientes, y
                  registra tus avances.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-star fa-3x"></i>
                </div>
                <h3>Reseñas personales</h3>
                <p>
                  Escribe tus reseñas y califica tus lecturas para recordar tus
                  impresiones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2>Cómo funciona</h2>
            <p className="lead">
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
                <div className="step mb-4 slide-in-right">
                  <div className="step-content">
                    <h3>Crea tu cuenta</h3>
                    <p>
                      Regístrate gratis y configura tu perfil de lector en
                      segundos.
                    </p>
                  </div>
                </div>
                <div className="step mb-4 slide-in-right">
                  <div className="step-content">
                    <h3>Añade tus libros</h3>
                    <p>
                      Agrega manualmente tus libros o utiliza el escáner de ISBN
                      para importarlos rápidamente.
                    </p>
                  </div>
                </div>
                <div className="step mb-4 slide-in-right">
                  <div className="step-content">
                    <h3>Organiza tu colección</h3>
                    <p>
                      Crea estanterías virtuales y organiza tus libros por
                      categorías, etiquetas o estados de lectura.
                    </p>
                  </div>
                </div>
                <div className="step slide-in-right">
                  <div className="step-content">
                    <h3>Disfruta y comparte</h3>
                    <p>
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
      <section className="testimonials-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2>Lo que dicen nuestros usuarios</h2>
            <p className="lead">
              Explora cómo MiBiblioteca ha cambiado sus experiencias de lectura
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="testimonial-card p-4">
                <div className="testimonial-content">
                  <p>
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
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">Carlos Ruiz</h5>
                    <small>Profesor de Literatura</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card p-4">
                <div className="testimonial-content">
                  <p>
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
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">Laura Gómez</h5>
                    <small>Ávida lectora</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card p-4">
                <div className="testimonial-content">
                  <p>
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
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">Miguel Sánchez</h5>
                    <small>Escritor</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-content text-center py-5">
            <h2 className="mb-4">¿Listo para organizar tu biblioteca?</h2>
            <p className="lead mb-4">
              Únete a miles de lectores que ya disfrutan de una experiencia de
              lectura más organizada y enriquecedora.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-primary btn-lg pulse"
            >
              Crear cuenta gratis
            </button>
            <p className="mt-3">
              <small>No se requiere tarjeta de crédito</small>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};