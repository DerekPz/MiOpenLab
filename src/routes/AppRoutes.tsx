import { Routes, Route } from "react-router-dom";
import AuthGateway from "../pages/auth/AuthGateway";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/profile/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import CreateProjectPage from '../pages/create/CreateProjectPage';
import ExploreProjectsPage from "../pages/explore/ExploreProjectsPage";
import ProjectDetailPage from "../pages/explore/ProjectDetailPage";

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
      <Route path="/create-project" element={<CreateProjectPage />} />
      <Route path="/explore" element={<ExploreProjectsPage />} /> 
      <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
