import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Perform login authentication here (e.g., API call)
    // If successful, store token and redirect
    localStorage.setItem("token", "dummy-auth-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex">
      <div className="card">
        <div className="card-header">
          <h1 className="app-title">Login</h1>
          <p className="app-description">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <button type="submit" className="auth-button login-button">
              Login
            </button>
            <div className="auth-footer">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
