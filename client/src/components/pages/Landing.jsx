import { useEffect } from 'react'
import axios from 'axios'

export default function Landing() {

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
    <h1>Landing Page</h1>
  )
}