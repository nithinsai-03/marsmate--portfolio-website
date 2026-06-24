'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CinematicFooter() {
  const groupRef = useRef<THREE.Group>(null);
  const monolithRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const particleCount = 500;
  const positions = useMemo(
    () => new Float32Array(particleCount * 3).map(() => Math.random() * 100 - 50),
    []
  );

  useFrame(({ clock }) => {
    if (monolithRef.current) {
      // Monolith rising animation
      monolithRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 10;
      monolithRef.current.rotation.y += 0.001;
      monolithRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.3) * 0.1;

      // Glow intensity pulse
      if (monolithRef.current.material instanceof THREE.Material) {
        const material = monolithRef.current.material as THREE.MeshPhysicalMaterial;
        if ('emissiveIntensity' in material) {
          material.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime) * 0.3;
        }
      }
    }

    // Camera zoom effect at page end (scroll-driven)
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollProgress > 0.9) {
      const zoomFactor = 1 + (scrollProgress - 0.9) * 10;
      camera.fov = 75 / zoomFactor;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -100]}>
      {/* Rising glass monolith */}
      <mesh ref={monolithRef}>
        <boxGeometry args={[8, 40, 8]} />
        <meshPhysicalMaterial
          color={0x00d9ff}
          transmission={0.95}
          opacity={0.6}
          metalness={0.2}
          roughness={0.1}
          emissive={0x00d9ff}
          emissiveIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Surrounding energy vortex */}
      <ParticleVortex count={particleCount} />

      {/* Multiple concentric rings */}
      {[1, 2, 3].map((i) => (
        <mesh key={`ring-${i}`} position={[0, 0, -5]}>
          <torusGeometry args={[15 + i * 8, 0.3, 64, 200]} />
          <meshStandardMaterial
            color={i === 1 ? 0x00d9ff : i === 2 ? 0xff6b00 : 0xff00ff}
            emissive={i === 1 ? 0x00d9ff : i === 2 ? 0xff6b00 : 0xff00ff}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Spotlight intensification */}
      <pointLight position={[0, 40, 0]} intensity={2} color="#00d9ff" decay={2} />
      <pointLight position={[20, 0, 20]} intensity={1.5} color="#ff6b00" decay={2} />
      <pointLight position={[-20, -20, 20]} intensity={1.2} color="#ff00ff" decay={2} />
    </group>
  );
}

// Particle vortex around monolith
function ParticleVortex({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + clock.elapsedTime * 2;
        const height = (i / count) * 40 - 20;
        const radius = 5 + Math.sin(clock.elapsedTime * 0.5 + i) * 10;

        const x = Math.cos(angle) * radius;
        const y = height + Math.sin(clock.elapsedTime + i * 0.1) * 2;
        const z = Math.sin(angle) * radius;

        dummy.position.set(x, y, z);
        dummy.scale.set(0.5, 0.5, 0.5);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.3, 1]} />
      <meshPhysicalMaterial
        color={0x00d9ff}
        emissive={0x00d9ff}
        emissiveIntensity={0.8}
        transmission={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}
