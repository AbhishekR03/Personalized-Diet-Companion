import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BasicUserInfo from "./pages/BasicUserInfo";
import DesiredDietGoals from "./pages/DesiredDietGoals"; // <-- Import Here

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/basic-user-info" element={<BasicUserInfo />} />
      <Route path="/diet-goals" element={<DesiredDietGoals />} />{" "}
      {/* <-- Add Route */}
    </Routes>
  );
}

export default App;
