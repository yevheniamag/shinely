import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
