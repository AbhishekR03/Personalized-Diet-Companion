import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="project-title">Personalized Diet Companion</h1>
      <p>Your AI-powered meal planning and diet tracking assistant.</p>
      <div className="button-group">
        <button className="auth-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="auth-button" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
