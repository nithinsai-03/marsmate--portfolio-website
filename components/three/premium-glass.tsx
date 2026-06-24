'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/lib/theme-context';

export function PremiumGlassShader() {
  return `
    uniform float time;
    uniform float metalness;
    uniform float roughness;
    uniform vec3 lightPos;
    uniform vec3 viewPos;
    uniform float transmissionAmount;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vViewDir;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
      
      // Breathing animation
      vec3 pos = position;
      float breathe = sin(time * 0.5) * 0.02;
      pos += normal * breathe;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
}

export function PremiumGlassMaterial() {
  const { theme } = useTheme();

  return new THREE.MeshPhysicalMaterial({
    transmission: 0.95,
    opacity: 0.85,
    metalness: 0.1,
    roughness: 0.08,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    color: theme === 'dark' ? 0xffffff : 0xf0f0f0,
  });
}

export function AnimatedGlassCard({
  position,
  scale,
  children,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  children?: React.ReactNode;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const material = useMemo(() => PremiumGlassMaterial(), [theme]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y +=
        Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.002;

      // Rotation breathing
      meshRef.current.rotation.x += (Math.sin(clock.elapsedTime * 0.3) * 0.0001);
      meshRef.current.rotation.z += (Math.cos(clock.elapsedTime * 0.25) * 0.0001);

      // Material update for theme
      material.color.set(theme === 'dark' ? 0xffffff : 0xf0f0f0);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} material={material}>
      <roundedBoxGeometry args={[1, 1, 1, 4, 0.1]} />
      {children}
    </mesh>
  );
}
