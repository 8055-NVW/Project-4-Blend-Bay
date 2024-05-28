import { Outlet } from "react-router-dom"

import Navbar from "./components/subcomponents/Navbar"
import Footer from "./components/subcomponents/Footer"

export default function Root() {
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
