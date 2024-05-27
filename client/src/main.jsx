import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


// Components
import Landing from './components/pages/Landing.jsx'
import Auth from './components/pages/Auth.jsx'
import Home from './components/pages/Home.jsx'
import Profile from './components/pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:  <Root/>,
    children: [
      {
        path: '',
        element: <Landing/>
      },
      {
        path: 'auth',
        element: <Auth/>
      },
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)