import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { generate } from 'random-words'

function Word({ children, ...props }) {
  const color = new THREE.Color()
  const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    ref.current.material.color.lerp(color.set(hovered ? '#3b82f6' : 'white'), 0.1)
  })
  return (
    <Billboard {...props}>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...fontProps} children={children} />
    </Billboard>
  )
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), generate()])
    return temp
  }, [count, radius])
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function Header() {
  return (
    <div className='h-[45vh] w-full relative '>
    {/* Background image */}
    <div className='absolute inset-0 bg-[url("./assets/ens.jpg")] bg-cover bg-center'></div>
    {/* Black overlay with opacity */}
    <div className='absolute inset-0 bg-black opacity-50'></div>
    {/* Content */}
    <div className='absolute min-w-max z-10 top-[243px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">Ecole Normale Supérieure Tétouan</h1>
    </div>
    {/* Canvas */}
    <div className='absolute z-10 h-[45vh] w-full left-1/2 transform -translate-x-1/2 blur-xs '>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
            <fog attach="fog" args={['#202025', 0, 80]} />
            <Suspense fallback={null}>
                <group rotation={[10, 10.5, 10]}>
                    <Cloud count={8} radius={20} />
                </group>
            </Suspense>
            <TrackballControls />
        </Canvas>
    </div>
  </div>

    
  )
}
