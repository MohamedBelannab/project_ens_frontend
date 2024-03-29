import React from 'react'
import StudentCard from './studentCard'
import { Select, Option ,  Input } from "@material-tailwind/react";

const StudentList = () => {
  return (
    <div className="px-4  sm:px-6 lg:px-8 ">
        <div className="space-y-6">
            <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Annuaire des étudiants</h1>
            </div>
            <div className="space-y-4">
            <div className="w-full max-w-xs flex  gap-x-2">
                <Input color="blue" label="Recherche Par Nom" />
                <Select color="blue" label="Select Filière">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
                <Select color="blue" label="Select Année">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
            </div>
            <div className="grid gap-4 grid-cols-1  xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
            </div>
            </div>
        </div>
    </div>

  )
}

export default StudentList