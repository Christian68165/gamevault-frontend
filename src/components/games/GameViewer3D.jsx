import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Card } from '../ui.jsx'

function GameBox({ coverUrl }) {
  const ref = useRef()
  
  // Cargamos la textura solo si hay una URL
  const texture = coverUrl ? useTexture(coverUrl) : null;

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.6
  })

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1.2, 1.6, 0.1]} />
      {texture ? (
        // Si hay imagen, la pintamos en el cubo (como si fuera la caja del juego)
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.3} />
      ) : (
        // Si no hay imagen, dejamos el color azul que tenías
        <meshStandardMaterial color="#4f46e5" metalness={0.3} roughness={0.35} />
      )}
    </mesh>
  )
}

// Agregamos 'coverUrl' como propiedad para recibir la imagen
export default function GameViewer3D({ coverUrl }) {
  return (
    <Card title="Juego Destacado - Rotar con el cursor" className="flex flex-col">
      <div className="min-h-72 flex-1 overflow-hidden rounded-xl bg-gradient-to-b from-slate-950 to-indigo-950/60 ring-1 ring-indigo-500/20">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <pointLight position={[-3, -2, 2]} intensity={5} color="#d946ef" />
          <GameBox coverUrl={coverUrl} />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
        </Canvas>
      </div>
    </Card>
  )
}