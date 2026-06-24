'use client';

import { useRef, useEffect } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create glass shader material
export const GlassMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Vertex shader
  `
  uniform float time;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    
    // Subtle floating displacement
    float displacement = sin(position.x * 2.0 + time * 0.3) * 0.02;
    displacement += cos(position.y * 1.5 + time * 0.2) * 0.01;
    displacement += sin(position.z * 2.5 + time * 0.4) * 0.015;
    
    vDisplacement = displacement;
    
    vec3 displacePos = position + normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacePos, 1.0);
  }
  `,
  // Fragment shader
  `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);
    
    // Fresnel effect
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
    
    // Glass color with subtle iridescence
    vec3 glassColor = vec3(0.8, 0.9, 1.0);
    glassColor += fresnel * vec3(0.5, 0.3, 0.8) * 0.2;
    
    // Transmission/transparency based on fresnel
    float alpha = 0.7 + fresnel * 0.2;
    
    gl_FragColor = vec4(glassColor, alpha);
  }
  `
);

interface GlassCardProps {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  children?: React.ReactNode;
}

export function GlassCard({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }: GlassCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
      <boxGeometry args={[1, 1, 0.2]} />
      <primitive object={new THREE.Material()} ref={materialRef} attach="material" />
      <meshStandardMaterial
        transmission={0.85}
        thickness={1.2}
        ior={1.5}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
