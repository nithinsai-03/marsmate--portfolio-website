'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/lib/theme-context';

// Volumetric light effect
export function VolumetricLights() {
  const lightRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.rotation.y = clock.elapsedTime * 0.1;
      lightRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={lightRef}>
      <pointLight position={[15, 20, 15]} intensity={1.2} color="#00d9ff" decay={2} />
      <pointLight position={[-15, -10, 20]} intensity={0.8} color="#ff6b00" decay={2} />
      <pointLight position={[0, 15, -20]} intensity={0.6} color="#ff00ff" decay={2} />
      <pointLight position={[20, -5, 0]} intensity={0.7} color="#00ff88" decay={2} />
    </group>
  );
}

// Enhanced particle system with energy flow
export function EnergyParticles({ count = 1000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const speeds = useMemo(() => Array(count).fill(0).map(() => Math.random() * 2 + 0.5), [count]);

  useEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        dummy.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        );
        dummy.scale.set(
          Math.random() * 0.5 + 0.1,
          Math.random() * 0.5 + 0.1,
          Math.random() * 0.5 + 0.1
        );
        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        const time = clock.elapsedTime * speeds[i];
        const x = Math.sin(time * 0.5) * 30 + Math.cos(time * 0.3) * 20;
        const y = Math.cos(time * 0.7) * 30 + Math.sin(time * 0.4) * 20;
        const z = Math.sin(time * 0.6 + i) * 40;

        dummy.position.set(x, y, z);
        dummy.scale.set(0.3, 0.3, 0.3);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.3, 2]} />
      <meshPhysicalMaterial
        color={0x00d9ff}
        emissive={0x00d9ff}
        emissiveIntensity={0.8}
        transmission={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// Floating geometric structures
export function FloatingStructures() {
  const ringRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = clock.elapsedTime * 0.3;
      ringRef.current.rotation.y = clock.elapsedTime * 0.2;
      ringRef.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 2;
    }
    if (gridRef.current) {
      gridRef.current.rotation.z = clock.elapsedTime * 0.15;
      gridRef.current.position.y = Math.cos(clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group>
      {/* Rotating rings */}
      <group ref={ringRef} position={[0, 0, -50]}>
        {[1, 2, 3].map((i) => (
          <mesh key={`ring-${i}`}>
            <torusGeometry args={[15 + i * 5, 0.2, 32, 100]} />
            <meshStandardMaterial
              color={0x00d9ff}
              emissive={0x00d9ff}
              emissiveIntensity={0.4}
              wireframe={true}
            />
          </mesh>
        ))}
      </group>

      {/* Holographic grid */}
      <group ref={gridRef} position={[30, 0, -80]}>
        <mesh>
          <planeGeometry args={[40, 40, 20, 20]} />
          <meshBasicMaterial
            color={0xff6b00}
            wireframe={true}
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      </group>

      {/* Floating spheres */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={`sphere-${i}`}
          position={[
            Math.cos(i * Math.PI * 0.4) * 25,
            Math.sin(i * Math.PI * 0.5) * 15,
            -60 + i * 10,
          ]}
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshPhysicalMaterial
            color={i % 2 === 0 ? 0x00d9ff : 0xff6b00}
            emissive={i % 2 === 0 ? 0x00d9ff : 0xff6b00}
            emissiveIntensity={0.5}
            transmission={0.8}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Dynamic gradient environment
export function DynamicGradientBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <mesh position={[0, 0, -100]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial
        color={theme === 'dark' ? 0x050505 : 0xf5f5f7}
        transparent={true}
        opacity={0.3}
      />
    </mesh>
  );
}

// Continuous energy ribbons connecting sections
export function EnergyRibbons() {
  const ribbonRef = useRef<THREE.Mesh>(null);

  const ribbonGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(10, 10, -20),
      new THREE.Vector3(0, 20, -40),
      new THREE.Vector3(-10, 10, -60),
      new THREE.Vector3(0, 0, -80),
    ]);
    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (ribbonRef.current) {
      ribbonRef.current.rotation.y = clock.elapsedTime * 0.1;
      ribbonRef.current.position.x = Math.sin(clock.elapsedTime * 0.3) * 5;
    }
  });

  return (
    <line ref={ribbonRef} geometry={ribbonGeometry}>
      <lineBasicMaterial
        color={0x00d9ff}
        linewidth={2}
        transparent={true}
        opacity={0.6}
      />
    </line>
  );
}
