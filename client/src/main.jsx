import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'


import './styles/main.scss'

// Components
import Auth from './components/pages/Auth.jsx'
import Home from './components/pages/Home.jsx'
import Profile from './components/pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='239000327408-8pmmabvocoddogbts14emj6pebdn1gdh.apps.googleusercontent.com'>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)