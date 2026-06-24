'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function BackgroundElements() {
  const groupRef = useRef<THREE.Group>(null);
  const rotatingRingsRef = useRef<THREE.Mesh[]>([]);
  const floatingSphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    // Rotate rings
    rotatingRingsRef.current.forEach((ring, idx) => {
      ring.rotation.x += 0.001 + idx * 0.0002;
      ring.rotation.y += 0.0015 + idx * 0.0003;
      ring.rotation.z += 0.0008 + idx * 0.0001;
    });

    // Float sphere
    if (floatingSphereRef.current) {
      floatingSphereRef.current.position.y = Math.sin(time * 0.3) * 2;
      floatingSphereRef.current.rotation.x += 0.0005;
      floatingSphereRef.current.rotation.y += 0.0008;
    }

    // Floating monoliths
    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Mesh && child !== floatingSphereRef.current) {
          child.position.y += Math.sin(time * 0.2 + idx) * 0.001;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Rotating Rings */}
      {[0, 1, 2].map((idx) => (
        <mesh
          key={`ring-${idx}`}
          position={[0, 0 - idx * 8, -15]}
          ref={(el) => {
            if (el && !rotatingRingsRef.current.includes(el)) {
              rotatingRingsRef.current[idx] = el;
            }
          }}
        >
          <torusGeometry args={[3 + idx * 2, 0.3, 16, 32]} />
          <meshStandardMaterial
            color={idx === 0 ? '#ff6b00' : idx === 1 ? '#00d9ff' : '#ff00ff'}
            emissive={idx === 0 ? '#ff6b00' : idx === 1 ? '#00d9ff' : '#ff00ff'}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Central Floating Sphere */}
      <mesh ref={floatingSphereRef} position={[0, 5, -10]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#4488ff"
          emissive="#4488ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Holographic Grid Planes */}
      {[-8, 0, 8].map((yOffset, idx) => (
        <mesh
          key={`grid-${idx}`}
          position={[0, yOffset, -12]}
          rotation={[Math.PI / 6, 0, 0]}
        >
          <planeGeometry args={[20, 10, 16, 8]} />
          <meshStandardMaterial
            color="#00ffff"
            wireframe
            transparent
            opacity={0.2}
            emissive="#00ffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Floating Monoliths */}
      {[-10, 0, 10].map((xOffset, idx) => (
        <mesh key={`monolith-${idx}`} position={[xOffset, idx * 4 - 4, -20]}>
          <boxGeometry args={[1, 6, 0.5]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#ff6b00' : '#00d9ff'}
            emissive={idx % 2 === 0 ? '#ff6b00' : '#00d9ff'}
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* Neural Network Lines */}
      {Array.from({ length: 5 }).map((_, idx) => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i < 5; i++) {
          points.push(
            new THREE.Vector3(
              Math.cos((i / 5) * Math.PI * 2) * (5 + idx * 2),
              Math.sin((i / 5) * Math.PI * 2) * (5 + idx * 2),
              -15 - idx * 3
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`network-${idx}`} geometry={geometry}>
            <lineBasicMaterial
              color={idx % 2 === 0 ? '#ff6b00' : '#00d9ff'}
              linewidth={2}
              transparent
              opacity={0.4}
            />
          </line>
        );
      })}
    </group>
  );
}
