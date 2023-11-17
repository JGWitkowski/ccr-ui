import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getToken } from './auth'

export function PrivateOutlet() {
  const location = useLocation()
  console.log('getToken(): ', getToken())
  return getToken() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}
