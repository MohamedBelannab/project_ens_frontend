import React from 'react'

const StudentCard = () => {
  return (
    <div
    className="rounded-lg border bg-card text-card-foreground shadow-xs"
    data-v0-t="card"
  >
    <div className="flex flex-col items-center p-6">
      <img
        src="https://api.dicebear.com/8.x/initials/svg?seed=Felix?backgroundColor=b6e3f4"
        width={160}
        height={160}
        alt="Student"
        className="rounded-full"
        style={{ aspectRatio: "160 / 160", objectFit: "cover" }}
      />
      <div className="text-center mt-4">
        <h3 className="text-lg font-bold">Alexis Harris</h3>
        <p className="text-sm text-gray-500">Student ID: 123456</p>
        <p className="text-sm text-gray-500">BSc in Computer Science</p>
      </div>
    </div>
    <div className="border-t border-gray-200 dark:border-gray-800" />
  </div>
  
  )
}

export default StudentCard