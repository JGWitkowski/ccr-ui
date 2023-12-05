import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from './auth'

export function PrivateOutlet({ children }) {
  const location = useLocation()
  console.log('getToken(): ', getToken())
  return getToken() ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}
