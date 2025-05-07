import React from 'react'
import { isAuthenticated } from '../../api/userAPI'
import { Navigate, Outlet } from 'react-router-dom'

const ClientRoutes = () => {
  return (
    isAuthenticated() ? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default ClientRoutes
