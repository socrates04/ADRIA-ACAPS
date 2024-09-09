import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const isAuthenticated = true; // Replace with actual authentication logic
  const userRole = "admin"; // Replace with actual role from the authentication state

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
