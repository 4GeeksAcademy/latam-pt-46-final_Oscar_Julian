import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/authContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (store.isAuthenticated) {
      navigate("/welcome");
    }
  }, [store.isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // Try to log in
    const success = await actions.login(email, password);
    if (success) {
      navigate("/welcome");
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Login</h2>

        {store.message && (
          <div className="alert alert-info" role="alert">
            {store.message}
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => actions.clearMessage()}
            />
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => setError("")}
            />
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
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};