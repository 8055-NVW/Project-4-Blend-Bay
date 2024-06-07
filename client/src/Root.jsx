import { Outlet } from "react-router-dom"
// import axios from 'axios'

import Navbar from "./components/subcomponents/Navbar"
import Footer from "./components/subcomponents/Footer"
// import { useEffect } from "react"

export default function Root() {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/set-token/')
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // })

  return (
    <div className='parent'>
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
