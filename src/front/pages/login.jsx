import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row shadow rounded-3 overflow-hidden w-75">
        {/* Sección izquierda: Login */}
        <div className="col-md-6 bg-white p-5">
          <h2 className="fw-bold">Login</h2>
          <p className="text-muted">Iniciar Sesión</p>

          <div className="form-group mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
              <input type="text" className="form-control" id="usuario" placeholder="Usuario" />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input type="password" className="form-control" id="password" placeholder="Contraseña" />
            </div>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary">Inicia Sesión</button>
          </div>

          <div className="mt-3">
            <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
          </div>
        </div>

        {/* Sección derecha: Inscribirse */}
        <div className="col-md-6 bg-primary text-white d-flex flex-column justify-content-center align-items-center p-5">
          <h2 className="fw-bold mb-3">Inscríbite</h2>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="btn btn-outline-light mt-3">¡Inscríbite!</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
