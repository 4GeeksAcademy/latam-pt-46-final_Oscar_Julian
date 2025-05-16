import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/globalReducer";

export const Login = () => {
  const { store, actions } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirigir si ya está logueado
  useEffect(() => {
    if (store.isAuthenticated) {
      navigate("/welcome");
    }
  }, [store.isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validar formulario
      if (!email || !password) {
        setError("Email and password are required");
        setIsSubmitting(false);
        return;
      }

      // Intentar iniciar sesión
      const success = await actions.login(email, password);
      if (success) {
        navigate("/welcome");
      } else {
        // Si el store ya tiene un mensaje de error, usarlo
        if (store.message) {
          setError(store.message);
          actions.clearMessage();
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>

              {store.message && (
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                  {store.message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => actions.clearMessage()}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};