import React from 'react'
import moment from "moment";

const StudentCard = ({item , index}) => {
  return (
    <div
    data-aos="fade-up" data-aos-delay="50"
    key={index}
    className="rounded-lg border bg-card text-card-foreground shadow-xs"
    data-v0-t="card"
  >
    <div className="flex flex-col items-center p-6">
      <img
        src={`https://api.dicebear.com/8.x/initials/svg?seed=${item.prenom}&backgroundColor=1e88e5`}
        width={160}
        height={160}
        alt="Student"
        className="rounded-full"
        style={{ aspectRatio: "160 / 160", objectFit: "cover" }}
      />
      <div className="text-center mt-4">
        <h3 className="text-lg font-bold">{item.prenom}</h3>
        <p className="text-sm text-gray-500">Année:  {moment(item.createdAt).format("YYYY")}</p>
        <p className="text-sm text-gray-500">{item.filiere.nomFilier}</p>
      </div>
    </div>
    <div className="border-t border-gray-200 dark:border-gray-800" />
  </div>
  
  )
}

export default StudentCard