'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Icosahedron,
  Sphere,
  Torus,
  Stars,
  MeshDistortMaterial,
  AdaptiveDpr,
} from '@react-three/drei'
import * as THREE from 'three'

const FLAME = '#ff6a00'
const EMBER = '#ff8c1a'
const CYAN = '#00d9ff'
const INDIGO = '#6b5cff'
const MAGENTA = '#ff2daf'

function Core() {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18
      // gentle parallax toward pointer
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.25,
        0.04,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -state.pointer.x * 0.18,
        0.04,
      )
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.4
  })

  return (
    <group ref={group}>
      {/* glowing distorted core */}
      <Icosahedron args={[1.35, 4]}>
        <MeshDistortMaterial
          color={FLAME}
          emissive={FLAME}
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.9}
          distort={0.32}
          speed={1.6}
        />
      </Icosahedron>

      {/* inner energy sphere */}
      <Sphere ref={inner} args={[0.85, 32, 32]}>
        <meshBasicMaterial color={EMBER} wireframe transparent opacity={0.35} />
      </Sphere>

      {/* holographic rings */}
      <Torus args={[2.1, 0.012, 16, 120]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color={CYAN} transparent opacity={0.8} />
      </Torus>
      <Torus args={[2.55, 0.01, 16, 120]} rotation={[Math.PI / 1.7, 0.6, 0]}>
        <meshBasicMaterial color={INDIGO} transparent opacity={0.6} />
      </Torus>
      <Torus args={[3.0, 0.008, 16, 120]} rotation={[Math.PI / 2.6, -0.5, 0.4]}>
        <meshBasicMaterial color={MAGENTA} transparent opacity={0.45} />
      </Torus>

      <OrbitingNodes />
    </group>
  )
}

function OrbitingNodes() {
  const ref = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    const colors = [CYAN, INDIGO, MAGENTA, EMBER]
    return Array.from({ length: 9 }).map((_, i) => {
      const radius = 2.1 + (i % 3) * 0.45
      const angle = (i / 9) * Math.PI * 2
      const tilt = (i % 2 ? 1 : -1) * 0.5
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * tilt,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: colors[i % colors.length],
        size: 0.05 + (i % 3) * 0.02,
      }
    })
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3
  })

  return (
    <group ref={ref}>
      {nodes.map((n, i) => (
        <Float key={i} speed={2} floatIntensity={0.6} rotationIntensity={0.4}>
          <Sphere args={[n.size, 16, 16]} position={n.position}>
            <meshBasicMaterial color={n.color} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { positions, colors } = useMemo(() => {
    const count = 900
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color(FLAME),
      new THREE.Color(CYAN),
      new THREE.Color(INDIGO),
      new THREE.Color(MAGENTA),
    ]
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04
      ref.current.rotation.x = state.pointer.y * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function IntelligenceCore() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={120} color={EMBER} />
      <pointLight position={[-6, -4, -4]} intensity={80} color={CYAN} />
      <pointLight position={[0, 0, 4]} intensity={40} color={MAGENTA} />
      <Stars radius={60} depth={40} count={2200} factor={3} saturation={0} fade speed={0.6} />
      <group scale={0.72} position={[0, 0.15, 0]}>
        <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.2}>
          <Core />
        </Float>
      </group>
      <ParticleField />
    </Canvas>
  )
}
