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
					</div>
					<div className="col-md-3">
						<h5>Enlaces</h5>
						<ul className="list-unstyled">
							{!store.isAuthenticated ? (
								<>
									<li><a href="#" className="text-white">Inicio</a></li>
									<li><a href="#" className="text-white">Características</a></li>
									<li><a href="#" className="text-white">Contacto</a></li>
								</>
							) : (
								<>
									<Link to="/" className="btn btn-outline-light home-btn">
										<li><a href="" className="text-white">Inicio</a></li>
									</Link>
									<Link to="/" className="btn btn-outline-light home-btn">
										<li><a href="#" className="text-white">Características</a></li>
									</Link>
									<Link to="/" className="btn btn-outline-light home-btn">
										<li><a href="#" className="text-white">Contacto</a></li>
									</Link>
								</>
							)}
						</ul>
					</div>
					<div className="col-md-3">
						<h5>Síguenos</h5>
						<div className="social-icons">
							<a href="#" className="text-white me-2"><i className="fab fa-facebook"></i></a>
							<a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
							<a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
						</div>
					</div>
				</div>
				<hr className="my-3" />
				<div className="text-center">
					<p className="small mb-0">&copy; 2025 Mi Biblioteca Personal. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
};
