import React from 'react'

const InfoHome = () => {
  return (
<div className='relative inset-0'>
    {/* Background image */}
    <div className='absolute inset-0 bg-[url("./assets/ens2.jpg")] z-0 bg-cover bg-center' ></div>
    {/* Black overlay with opacity */}
    <div className='absolute inset-0 bg-black opacity-30 z-10'></div>
    {/* Content */}
    <div className="grid gap-4 z-20 relative px-6 py-6 md:grid-cols-2 md:py-12 lg:gap-10 xl:gap-16 xl:px-16">
        <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
                <h1 className="text-2xl text-white font-bold tracking-tighter sm:text-3xl md:text-4xl">
                    Ecole Normale Supérieure Tétouan
                </h1>
                <p className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    L'École nationale des sciences appliquées de Tétouan est une école publique d'ingénieurs au Maroc créée en septembre 2008.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold tracking-tighter sm:text-2xl text-white">
                        Students
                    </h2>
                    <p className="text-3xl font-bold text-blue-500">10,000</p>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold tracking-tighter sm:text-2xl text-white">
                        Formations
                    </h2>
                    <p className="text-3xl font-bold text-blue-500">100</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
            <div className="rounded-lg bg-white  border-4 border-blue-500 border-dashed bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6 ">
                    <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
                        Computer Science
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        The Computer Science program provides students with a comprehensive
                        understanding of computer software, hardware, and programming.
                    </p>
                </div>
            </div>
            <div className="rounded-lg bg-white  border-4 border-blue-500 border-dashed bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6 ">
                    <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
                        Business Administration
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        The Business Administration program equips stud
                    </p>
                </div>
            </div>
            <div className="rounded-lg bg-white  border-4 border-blue-500 border-dashed bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6 ">
                    <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
                        Electrical Engineering
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        The Electrical Engineering program offers students a comprehensive
                        education in the principles and practices of electrical engineering.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>


  )
}

export default InfoHome