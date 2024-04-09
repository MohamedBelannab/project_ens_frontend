import React from 'react'

const StudentHead = () => {
  return (
    <div className='h-[50vh] w-full relative '>
    {/* Background image */}
    <div className='absolute inset-0 bg-[url("./assets/student.jpg")] bg-cover bg-center'></div>
    {/* Black overlay with opacity */}
    <div className='absolute inset-0 bg-black opacity-50'></div>
    {/* Content */}
    <div className='absolute min-w-max z-10 top-[243px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">ENS Tétouan <span className='text-blue-500'>Étudiants</span></h1>
    </div>
  </div>
  )
}

export default StudentHead