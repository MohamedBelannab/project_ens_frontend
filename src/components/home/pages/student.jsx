import React from 'react'
import StudentHead from '../studentHead'
import StudentList from '../studentList'

const Student = () => {
  return (
    <div className='flex flex-col gap-4 gap-y-12'>
        <StudentHead/>
        <StudentList/>
    </div>
  )
}

export default Student