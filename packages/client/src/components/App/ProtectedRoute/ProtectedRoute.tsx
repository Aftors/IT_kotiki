import { Navigate, Outlet, useLocation } from 'react-router'
import { EPATH } from '../../../models/models'
import { ReactElement, useState, useEffect } from 'react'

export const ProtectedRoute = (): ReactElement | null => {
  const location = useLocation()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(localStorage.getItem('auth') !== 'true')
  }, [])

  if (isAuth) {
    return <Navigate to={EPATH.SIGN_IN} state={{ from: location }} />
  }

  return <Outlet />
}
