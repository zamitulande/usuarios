import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import User from '../components/User'
import Users from '../components/Users'

const Routes = () => {
  const router = createBrowserRouter([
    {
        path: "/",
        element: <Users/>
    }
  ])
  return <RouterProvider router={router} />
}

export default Routes