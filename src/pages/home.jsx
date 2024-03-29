import React from 'react'
import { NavbarWithMegaMenu } from '../layout/Navbar'
import '../components/home/css/home.css'
import { Outlet } from 'react-router-dom'
import { Footer } from '../layout/Footer'

const Home = () => {
  return (
    
    <>
    <NavbarWithMegaMenu/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Home