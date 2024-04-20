
import React from 'react'
import { Each } from '../each/each'
import { useSelector } from 'react-redux'
import moment from 'moment';

const FiliersHome = () => {
  let filiers = useSelector(state => state.formation.formations)
  console.log(filiers);
  return (
    <section className="w-full ">
  <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
    <div className="space-y-3">
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-blue-500  ">
        Formations
      </h2>
      <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        
      </p>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
     
      <Each of={filiers.slice(0,6)} render={(item , index) =>  <div key={index} data-aos="zoom-in" data-aos-delay="60" className="flex flex-col items-center justify-center  h-full p-4 border border-gray-200 rounded-lg shadow-sm md:flex-row md:p-4  md:items-center md:justify-center md:gap-2">
        <img
          src={"https://img.freepik.com/premium-vector/training-line-concept-simple-line-icon-colored-illustration-training-symbol-flat-design-can-be-used-ui-ux_159242-4745.jpg?w=826"}

          alt="Icon"
          className="rounded-lg w-20"
          style={{ aspectRatio: "48/48", objectFit: "cover" }}
        />
        <div className="space-y-1 flex flex-col justify-start ">
          <h3 className="text-lg font-semibold  text-start">{item.nomFilier}</h3>
          <p className="text-sm text-gray-500">créé a {moment(item.createdAt).fromNow()}</p>
        </div>
      </div> } />
      
      
     
 
    </div>
  </div>
    </section>
  )
}

export default FiliersHome