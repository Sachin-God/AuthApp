import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
  const {user} = useSelector((state) => state.user)
  return (
    <div>
      {user ? <Outlet/> : <Navigate to={'/login'}/>}  
      {/* outlet means children inside it wrapped */}
    </div>
  )
}
