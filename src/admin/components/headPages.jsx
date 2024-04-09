import { Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeadPages = ({name}) => {
    const navigate  = useNavigate()

  return (
    <div className="flex items-center">
      <h1 className="font-semibold text-lg md:text-xl"> {name}</h1>
      <Button onClick={()=>{navigate(-1)}} size='sm' className="inline-flex items-center justify-center  text-xs rounded-md px-3 ml-auto" variant="outlined">
      retourner
      </Button>
    </div>
  )
}

export default HeadPages