import { Link, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Navbar = () => {
	const { store, actions } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/login");
	};

	return (
		<nav className="navbar justify-content-center p-4">
			<div className="btn-group shadow-0 w-auto" role="group" aria-label="Basic example">
				<Link to="/" className="btn btn-outline-primary home-btn">
					<i className="fa-solid fa-house"></i>
					<span className="ms-1 text-span">Mi Biblioteca</span>
				</Link>

				<Link to="/" className="btn btn-outline-primary home-btn">
					<i className="fa-solid fa-binoculars"></i>
					<span className="ms-1 text-span">Explorar</span>
				</Link>

				{!store.isAuthenticated ? (
					<>
						<Link to="/login" className="btn btn-outline-primary login-btn">
							<i className="fa-solid fa-right-to-bracket"></i>
							<span className="ms-1 text-span">Login</span>
						</Link>

						<Link to="/signup" className="btn btn-outline-primary signup-btn">
							<i className="fa-solid fa-user-plus"></i>
							<span className="ms-1 text-span">Registro</span>
						</Link>
					</>
				) : (
					<button
						type="button"
						className="btn btn-outline-primary signup-btn"
						onClick={handleLogout}
					>
						<i className="fa-solid fa-user-minus"></i>
						<span className="ms-1 text-span">Cerrar Sesión</span>
					</button>
				)}
			</div>
		</nav>
	);
};