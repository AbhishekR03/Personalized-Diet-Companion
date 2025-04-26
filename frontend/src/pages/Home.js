import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="card">
        <div className="card-header">
          <h1 className="home-title">NutriTrack</h1>
          <p className="app-description">
            Your personalized nutrition and diet planning assistant
          </p>
        </div>
        <div className="card-content">
          <div className="home-buttons">
            <button
              className="auth-button login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="auth-button register-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
