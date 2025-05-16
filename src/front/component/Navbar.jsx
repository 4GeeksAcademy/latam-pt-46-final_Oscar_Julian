import { Link, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
	const { store, actions } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/login");
	};

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<nav className="navbar justify-content-center p-4 navigator">
			<div className="container d-flex justify-content-between align-items-center">
				<Link to={!store.isAuthenticated ? "/" : "/welcome"} className="navbar-brand">
					<img className="img-fluid" src="https://www.ellibrototal.com/estaticosED/files/img/ltotalLogo2.svg" alt="Logo de El Libro Total" style={{ height: '40px' }} />
				</Link>

				{/* Barra de búsqueda (solo visible cuando está autenticado) */}
				{store.isAuthenticated && <SearchBar />}

				<div className="btn-group shadow-0 w-auto" role="group" aria-label="Main Navigation">
					{!store.isAuthenticated ? (
						<>
							<Link to="/" className="btn btn-outline-light home-btn">
								<i className="fa-solid fa-house me-1"></i>
								<span className="text-span">Inicio</span>
							</Link>
							<button onClick={() => scrollToSection('features-section')} className="btn btn-outline-light features-btn">
								<i className="fa-solid fa-star me-1"></i>
								<span className="text-span">Características</span>
							</button>
							<button onClick={() => scrollToSection('how-it-works-section')} className="btn btn-outline-light how-it-works-btn">
								<i className="fa-solid fa-question-circle me-1"></i>
								<span className="text-span">Cómo Funciona</span>
							</button>
							<button onClick={() => scrollToSection('testimonials-section')} className="btn btn-outline-light testimonials-btn">
								<i className="fa-solid fa-comments me-1"></i>
								<span className="text-span">Testimonios</span>
							</button>
						</>
					) : (
						<>
							<Link to="/welcome" className="btn btn-outline-light home-btn">
								<i className="fa-solid fa-book me-1"></i>
								<span className="text-span">Mi Biblioteca</span>
							</Link>
						</>
					)}
				</div>
				<div className="btn-group shadow-0 w-auto" role="group" aria-label="User Actions">
					{!store.isAuthenticated ? (
						<>
							<Link to="/login" className="btn btn-outline-light login-btn">
								<i className="fa-solid fa-right-to-bracket me-1"></i>
								<span className="text-span">Login</span>
							</Link>
							<Link to="/signup" className="btn btn-outline-light signup-btn ms-2">
								<i className="fa-solid fa-user-plus me-1"></i>
								<span className="text-span">Registro</span>
							</Link>
						</>
					) : (
						<button
							type="button"
							className="btn btn-outline-light logout-btn"
							onClick={handleLogout}
						>
							<i className="fa-solid fa-user-minus me-1"></i>
							<span className="text-span">Cerrar Sesión</span>
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};