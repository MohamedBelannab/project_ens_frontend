import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarWithLogo } from './layouts/sideBar'
import Navbar from './layouts/navbar'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'

const Dashboard = () => {
  return (
    <>
    <ToastContainer/>
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <SidebarWithLogo/>
      </div>
      <div className="flex flex-col">
       <Navbar/>
        <Outlet/>
      </div>
    </div>
  </>
  )
}

export default Dashboard

