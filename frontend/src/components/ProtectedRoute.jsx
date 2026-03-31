import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  // Not logged in at all
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Logged in, but wrong role (e.g., employee trying to access employer dashboard)
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'employer' ? '/employer-dashboard' : '/employee-dashboard'} replace />;
  }

  // Authorized
  return children;
}