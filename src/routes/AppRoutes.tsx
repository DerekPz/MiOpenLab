import { Routes, Route } from "react-router-dom";
import AuthGateway from "../pages/auth/AuthGateway";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/auth/profile/ProfilePage";
import PrivateRoute from "./PrivateRoute";

// ...
<Route path="/profile" element={
  <PrivateRoute>
    <ProfilePage />
  </PrivateRoute>
} />


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthGateway />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      } />

    </Routes>
  );
};

export default AppRoutes;
