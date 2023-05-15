import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface IProps {
  redirectPath: string;
}

export default function ProtectedRoute({ redirectPath }: IProps) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
}
