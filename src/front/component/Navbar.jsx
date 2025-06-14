import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";
import { UserAdminModal } from "./UserAdminModal";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
	const { store, actions } = useGlobalReducer();
	const navigate = useNavigate();
	const location = useLocation();

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

	const handleSeedDatabase = async () => {
		if (window.confirm('¿Estás seguro de querer poblar la base de datos? Esto puede tomar varios minutos.')) {
			await actions.seedBooks();
			// Recargar los libros después de sembrar
			actions.getBooks(store.currentPage);
		}
	};

	// Definir las rutas donde se debe mostrar el SearchBar
	const searchBarRoutes = ['/welcome', '/library', '/favorites'];
	const shouldShowSearchBar = store.isAuthenticated && searchBarRoutes.includes(location.pathname);

	return (
		<nav className="navbar justify-content-center p-2 p-md-4 navigator">
			<div className="container-fluid d-flex flex-column flex-lg-row justify-content-between align-items-center gap-2 gap-lg-0">
				<Link to={!store.isAuthenticated ? "/" : "/welcome"} className="navbar-brand">
					<img className="img-fluid" src="https://www.ellibrototal.com/estaticosED/files/img/ltotalLogo2.svg" alt="Logo de El Libro Total" style={{ height: '40px' }} />
				</Link>

				{/* Barra de búsqueda (solo visible en rutas específicas cuando está autenticado) */}
				{shouldShowSearchBar && <SearchBar />}

				{/* Botón de sembrar base de datos (solo cuando está autenticado) */}


				{/* Navegación principal */}
				<div className="btn-group shadow-0 w-auto" role="group" aria-label="Main Navigation">
					{!store.isAuthenticated ? (
						<>
							<Link to="/" className="btn btn-outline-light home-btn">
								<i className="fa-solid fa-house me-1"></i>
								<span className="text-span">Inicio</span>
							</Link>
							<Link to="/features" className="btn btn-outline-light features-btn">
								<i className="fa-solid fa-rocket me-1"></i>
								<span className="text-span">Funcionalidades</span>
							</Link>
							<Link to="/about" className="btn btn-outline-light about-btn">
								<i className="fa-solid fa-users me-1"></i>
								<span className="text-span">Sobre Nosotros</span>
							</Link>
							<Link to="/help" className="btn btn-outline-light help-btn">
								<i className="fa-solid fa-question-circle me-1"></i>
								<span className="text-span">Ayuda</span>
							</Link>
							<Link to="/terms" className="btn btn-outline-light terms-btn">
								<i className="fa-solid fa-file-contract me-1"></i>
								<span className="text-span">Términos</span>
							</Link>
							<Link to="/privacy" className="btn btn-outline-light privacy-btn">
								<i className="fa-solid fa-shield-alt me-1"></i>
								<span className="text-span">Privacidad</span>
							</Link>
							<Link to="/desarrolladores" className="btn btn-outline-light privacy-btn">
								<i class="fa-solid fa-code me-1"></i>
								<span className="text-span">Desarrolladores</span>
							</Link>
						</>
					) : (
						<>
							{store.user?.rol === 1 && (
								<>
									<button
										className="btn btn-outline-info ms-2"
										data-bs-toggle="modal"
										data-bs-target="#userAdminModal"
									>
										<i className="fa-solid fa-users-gear me-1"></i>
										<span className="text-span">Administrar Usuarios</span>
									</button>
									<UserAdminModal />
								</>
							)}
							{(store.isAuthenticated && store.user?.rol === 1) && (
								<div className="btn-group shadow-0 w-auto" role="group" aria-label="Database Actions">
									<button
										className="btn btn-warning"
										onClick={handleSeedDatabase}
										disabled={store.isSeeding}
									>
										{store.isSeeding ? (
											<>
												<span className="spinner-border spinner-border-sm" role="status"></span>
												<span className="ms-2">Sembrando... {store.seedingProgress}%</span>
											</>
										) : (
											<>
												<i className="fa-solid fa-database me-2"></i>
												<span className="text-span">Poblar Base de Datos</span>
											</>
										)}
									</button>
								</div>
							)}
							<Link className="btn btn-outline-light home-btn" to="/favorites">
								<i className="fa-solid fa-heart me-1 text-danger"></i>
								<span className="text-span">Favoritos</span>
							</Link>
							<Link className="btn btn-outline-light home-btn" to="/stats">
								<i className="fa-solid fa-chart-bar me-2"></i>
								<span className="text-span">Estadisticas</span>
							</Link>
							<Link className="btn btn-outline-light home-btn" to="/other-books">
								<i className="fa-solid fa-users me-2"></i>
								<span className="text-span">Otros Libros</span>
							</Link>
							<Link className="btn btn-outline-light home-btn" to="/welcome">
								<i className="fa-solid fa-magnifying-glass-plus"></i>
								<span className="text-span">Explorar</span>
							</Link>
							<Link className="btn btn-outline-light home-btn" to="/library">
								<i className="fa-solid fa-book me-1"></i>
								<span className="text-span">Mi Biblioteca</span>
							</Link>
						</>
					)}
				</div>

				{/* Acciones de usuario */}
				<div className="btn-group shadow-0 w-auto ms-0 ms-lg-2 mt-2 mt-lg-0" role="group" aria-label="User Actions">
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