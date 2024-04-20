import React from 'react'
import { useSelector } from 'react-redux';
import deparImg from '../../assets/departement.jpg'
import { Each } from '../each/each';

const DepartementsHome = () => {
  let departements = useSelector((state) => state.departement.departements);
  console.log(departements);
  return (
    <section className="w-full  pb-12">
  <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
    <div className="space-y-3">
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-blue-500 ">
        Départements
      </h2>
      <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        Showcase your skills with beautifully designed skill cards.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-3">
      <Each of={departements.slice(0 , 6)} render={(item , index) =><div data-aos="fade-up" data-aos-delay="50" key={index} className="flex flex-col items-start gap-1 rounded-lg border border-gray-200 bg-gray-50 p-4 w-full max-w-sm justify-center overflow-hidden dark:border-gray-800 dark:bg-gray-950">
        <img
          src={deparImg}
          alt="Computer Science"
          width={300}
          height={150}
          className="rounded-t-lg object-cover"
          style={{ aspectRatio: "300 / 150", objectFit: "cover" }}
        />
        <div className="flex-1 p-4">
          <h3 className="font-semibold">{item.nomDepartement}</h3>
        </div>
        <a
          className="flex h-10 items-center justify-center rounded-b-lg bg-blue-500 w-full text-sm font-medium text-gray-50 hover:bg-blue-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#"
        >
          View Program
        </a>
      </div> } />
      
    </div>
  </div>
    </section>
  )
}

export default DepartementsHome