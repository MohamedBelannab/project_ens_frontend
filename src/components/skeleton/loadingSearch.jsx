import React from 'react'

import { Audio } from 'react-loader-spinner'

const LoadingSearch = () => {
  return (
    <div className='flex justify-center items-center w-full h-[500px]'>
        <Audio
  height="80"
  width="80"
  radius="9"
  color="#3b82f6"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </div>
  )
}

export default LoadingSearch

