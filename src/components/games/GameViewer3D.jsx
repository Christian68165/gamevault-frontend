import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Card } from '../ui.jsx'

function GameBox() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.6
  })
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1.5, 0.2]} />
      <meshStandardMaterial color="#4f46e5" metalness={0.3} roughness={0.35} />
    </mesh>
  )
}

export default function GameViewer3D() {
  return (
    <Card title="Juego Destacado - Rotar con el cursor" className="flex flex-col">
      <div className="min-h-72 flex-1 overflow-hidden rounded-xl bg-gradient-to-b from-slate-950 to-indigo-950/60 ring-1 ring-indigo-500/20">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <pointLight position={[-3, -2, 2]} intensity={8} color="#d946ef" />
          <GameBox />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
        </Canvas>
      </div>
    </Card>
  )
}
