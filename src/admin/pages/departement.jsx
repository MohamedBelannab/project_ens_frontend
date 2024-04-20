import React from 'react'
import HeadPages from '../components/headPages'
import { Outlet } from 'react-router-dom'


const Departement = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <HeadPages name='Departement'/>
    <div className="grid gap-4 px-2">
      <Outlet/>
    </div>
    </main>
  )
}

export default Departement