import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	return (
		<nav className="navbar justify-content-center p-4">
			<div className="btn-group shadow-0 w-auto" role="group" aria-label="Basic example">
				<button type="button" className="btn btn-outline-primary home-btn">
					<i className="fa-solid fa-house"></i>
					<span className="ms-1 text-span">Mi Biblioteca</span>
				</button>

				<button type="button" className="btn btn-outline-primary home-btn">
					<i class="fa-solid fa-binoculars"></i>
					<span className="ms-1 text-span">Explorar</span>
				</button>

				<button onClick={() => navigate("/sign")} type="button" className="btn btn-outline-primary login-btn">
					<i className="fa-solid fa-right-to-bracket"></i>
					<span className="ms-1 text-span">Login</span>
				</button>

				<button type="button" className="btn btn-outline-primary signup-btn">
					<i className="fa-solid fa-user-plus"></i>
					<span className="ms-1 text-span">Registro</span>
				</button>

				<button type="button" className="btn btn-outline-primary signup-btn">
					<i className="fa-solid fa-user-minus"></i>
					<span className="ms-1 text-span">Cerrar Sesion</span>
				</button>
			</div>
		</nav>
	);
};