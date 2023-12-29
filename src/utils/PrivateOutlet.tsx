import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from './auth'
import { selectToken } from '../features/Login/userSlice'
import { useSelector } from 'react-redux'
export function PrivateOutlet({ children }) {
  const location = useLocation()
  const token = useSelector((state) => state.auth)
  console.log('tokefksddf: ', token)
  // console.log(
  //   'getToken()fsdfsdf:Ź ',
  //   useSelector((state) => state.auth.token),
  // )
  return token ? children : <Navigate to="/login" state={{ from: location }} />
}
