import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/authContext";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Try to sign up
    const success = await actions.signup(email, password);
    if (success) {
      // Redirect to login on success
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Sign Up</h2>

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

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={store.isLoading}
          >
            {store.isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};