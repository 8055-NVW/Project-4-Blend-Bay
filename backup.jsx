// App.jsx
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    async function getShakeData(){
      try {
        const { data } = await axios.get('/api/shakes/')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getShakeData()
  })

  return (
    <h1>Hello World</h1>
  )
}

export default App


// Main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
