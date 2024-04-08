import { Navigate, Outlet, useLocation } from 'react-router'
import { EPATH } from '../../../models/models'
import { ReactElement } from 'react'

export const ProtectedRoute = (): ReactElement | null => {
  const location = useLocation()

  if (localStorage.getItem('auth') !== 'true') {
    return <Navigate to={EPATH.SIGN_IN} state={{ from: location }} />
  }

  return <Outlet />
}
