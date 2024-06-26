import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google'

// Styling Components
import { createTheme, ThemeProvider } from '@mui/material'
import './styles/main.scss'

// Components
import Auth from './components/pages/Auth.jsx'
import Home from './components/pages/Home.jsx'
import Landing from './components/pages/Landing.jsx'
import Profile from './components/pages/Profile.jsx'
import Shake from './components/pages/Shake.jsx'
import AddShake from './components/pages/AddShake.jsx'
import UpdateShake from './components/pages/UpdateShake.jsx'
import SearchResults from './components/pages/SearchResults.jsx'

// Material UI Theme
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0097A7',
    },
    secondary: {
      main: '#FFC107',
    },
  },
})

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Landing />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'profile/:userId',
        element: <Profile />
      },
      {
        path: 'shake/:shakeId',
        element: <Shake />
      },
      {
        path: 'addshake',
        element: <AddShake />
      },
      {
        path: 'updateshake/:shakeId',
        element: <UpdateShake />
      },
      {
        path: 'search',
        element: <SearchResults/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode >
)
