import React from 'react'

const Home = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Upcoming Events</h1>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 ml-auto">
            Add Event
          </button>
        </div>
        <div className="grid gap-4">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4 py-4 md:py-6">
              <div className="flex items-center gap-2 text-base font-semibold md:text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                Midterm Exams
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground md:ml-auto w-8 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="sr-only">Mark as important</span>
              </button>
            </div>
            <div className="p-6 pb-4">
              <div className="grid gap-2 text-sm leading-relaxed md:grid-cols-[200px_1fr] md:gap-0 md:grid-rows-2">
                <div className="font-medium">Date:</div>
                <div>March 15th - March 20th, 2023</div>
                <div className="font-medium">Location:</div>
                <div>Room 210, Main Building</div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-end gap-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Details
              </button>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4 py-4 md:py-6">
              <div className="flex items-center gap-2 text-base font-semibold md:text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                Midterm Exams
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground md:ml-auto w-8 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="sr-only">Mark as important</span>
              </button>
            </div>
            <div className="p-6 pb-4">
              <div className="grid gap-2 text-sm leading-relaxed md:grid-cols-[200px_1fr] md:gap-0 md:grid-rows-2">
                <div className="font-medium">Date:</div>
                <div>March 15th - March 20th, 2023</div>
                <div className="font-medium">Location:</div>
                <div>Room 210, Main Building</div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-end gap-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Details
              </button>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4 py-4 md:py-6">
              <div className="flex items-center gap-2 text-base font-semibold md:text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                Midterm Exams
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground md:ml-auto w-8 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="sr-only">Mark as important</span>
              </button>
            </div>
            <div className="p-6 pb-4">
              <div className="grid gap-2 text-sm leading-relaxed md:grid-cols-[200px_1fr] md:gap-0 md:grid-rows-2">
                <div className="font-medium">Date:</div>
                <div>March 15th - March 20th, 2023</div>
                <div className="font-medium">Location:</div>
                <div>Room 210, Main Building</div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-end gap-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Details
              </button>
            </div>
          </div>
        </div>
    </main>

  )
}

export default Home