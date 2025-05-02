import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/google-oauth`,
        { token: response.credential }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
