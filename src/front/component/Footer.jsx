import { Link } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Footer = () => {
	const { store, actions } = useGlobalReducer();

	return (
		<footer className="text-white py-4">
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h5>Mi Biblioteca Personal</h5>
						<p className="small">Tu espacio para gestionar y disfrutar de tus lecturas favoritas.</p>
						<div className="d-flex gap-3 mt-3">
							<div className="social-icons">
								<a href="#" className="text-white me-2" title="Facebook">
									<i className="fab fa-facebook"></i>
								</a>
								<a href="#" className="text-white me-2" title="Twitter">
									<i className="fab fa-twitter"></i>
								</a>
								<a href="#" className="text-white" title="Instagram">
									<i className="fab fa-instagram"></i>
								</a>
							</div>
						</div>
					</div>

					<div className="col-md-3">
						<h5>Información</h5>
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link to="/about" className="text-white text-decoration-none">
									<i className="fa-solid fa-users me-2"></i>
									Sobre Nosotros
								</Link>
							</li>
							<li className="mb-2">
								<Link to="/features" className="text-white text-decoration-none">
									<i className="fa-solid fa-rocket me-2"></i>
									Funcionalidades
								</Link>
							</li>
							<li className="mb-2">
								<Link to="/help" className="text-white text-decoration-none">
									<i className="fa-solid fa-question-circle me-2"></i>
									Centro de Ayuda
								</Link>
							</li>
							{store.isAuthenticated && (
								<li className="mb-2">
									<Link to="/stats" className="text-white text-decoration-none">
										<i className="fa-solid fa-chart-bar me-2"></i>
										Mis Estadísticas
									</Link>
								</li>
							)}
						</ul>
					</div>

					<div className="col-md-3">
						<h5>Legal</h5>
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link to="/terms" className="text-white text-decoration-none">
									<i className="fa-solid fa-file-contract me-2"></i>
									Términos y Condiciones
								</Link>
							</li>
							<li className="mb-2">
								<Link to="/privacy" className="text-white text-decoration-none">
									<i className="fa-solid fa-shield-alt me-2"></i>
									Política de Privacidad
								</Link>
							</li>
							{!store.isAuthenticated && (
								<>
									<li className="mb-2">
										<Link to="/login" className="text-white text-decoration-none">
											<i className="fa-solid fa-right-to-bracket me-2"></i>
											Iniciar Sesión
										</Link>
									</li>
									<li className="mb-2">
										<Link to="/signup" className="text-white text-decoration-none">
											<i className="fa-solid fa-user-plus me-2"></i>
											Registrarse
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>

				{/* Separador */}
				<hr className="my-4" />

				{/* Información adicional */}
				<div className="row">
					<div className="col-md-8">
						<div className="d-flex flex-wrap gap-4 small text-white-50">
							<span>
								<i className="fa-solid fa-map-marker-alt me-1"></i>
								Heredia, Costa Rica
							</span>
							<span>
								<i className="fa-solid fa-envelope me-1"></i>
								info@mibiblioteca.com
							</span>
							<span>
								<i className="fa-solid fa-globe me-1"></i>
								Disponible en español
							</span>
						</div>
					</div>
					<div className="col-md-4 text-md-end">
						<div className="small text-white-50">
							<i className="fa-solid fa-code me-1"></i>
							Hecho con ❤️ para lectores
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="text-center mt-3">
					<p className="small mb-0 text-white-50">
						&copy; 2025 Mi Biblioteca Personal. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};