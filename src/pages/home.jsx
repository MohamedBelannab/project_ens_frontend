import React from 'react'
import { NavbarWithMegaMenu } from '../layout/Navbar'
import '../components/home/css/home.css'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    
    <>
    <NavbarWithMegaMenu/>
    <Outlet/>
    </>
  )
}

export default Home