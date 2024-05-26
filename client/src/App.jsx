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