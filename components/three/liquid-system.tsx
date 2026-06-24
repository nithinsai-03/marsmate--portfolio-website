'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const liquidVertexShader = `
uniform float time;
uniform vec2 mouse;
uniform float mouseInfluence;

varying vec2 vUv;
varying vec3 vPosition;
varying float vNoise;

// Simple perlin-like noise
float hash(float n) {
  return fract(sin(n) * 43758.5453);
}

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Create flowing liquid effect with simpler noise
  float n1 = noise(uv.x * 3.0 + uv.y * 3.0 + time * 0.5);
  float n2 = noise(uv.x * 5.0 - time * 0.3 + uv.y * 5.0);
  
  // Wave displacement
  pos.y += sin(pos.x * 2.0 + time * 0.5) * 0.1 + n1 * 0.1;
  pos.z += cos(uv.y * 4.0 + time * 0.3) * 0.05 + n2 * 0.05;
  
  // Mouse influence (ripple effect)
  float distToMouse = length(uv - mouse);
  if (distToMouse < 0.3) {
    float ripple = sin((distToMouse - time * 0.5) * 10.0) * (1.0 - distToMouse) * mouseInfluence;
    pos.z += ripple * 0.15;
  }
  
  vPosition = pos;
  vNoise = n1 * 0.5 + n2 * 0.5;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const liquidFragmentShader = `
uniform float time;
varying vec2 vUv;
varying float vNoise;

void main() {
  // Create gradient based on position and noise
  vec3 color = vec3(0.0);
  
  // Flame to Cyan to Magenta gradient
  float t = vNoise + sin(vUv.y * 3.0 + time * 0.3) * 0.5;
  
  // Flame (red-orange) at bottom
  vec3 flame = vec3(1.0, 0.4, 0.0);
  
  // Cyan in middle
  vec3 cyan = vec3(0.0, 0.8, 1.0);
  
  // Magenta at top
  vec3 magenta = vec3(1.0, 0.0, 1.0);
  
  // Mix based on vertical position and noise
  if (t < 0.33) {
    color = mix(flame, cyan, t * 3.0);
  } else if (t < 0.66) {
    color = mix(cyan, magenta, (t - 0.33) * 3.0);
  } else {
    color = mix(magenta, flame, (t - 0.66) * 3.0);
  }
  
  // Add some transparency and glow
  float alpha = 0.6 + sin(vUv.x * 5.0 + time * 0.2) * 0.2;
  
  gl_FragColor = vec4(color, alpha);
}
`;

interface LiquidSystemProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export function LiquidSystem({ position = [0, 0, -5], scale = [10, 20, 1] }: LiquidSystemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePos = useRef<[number, number]>([0, 0]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        mouseInfluence: { value: 0.5 },
      },
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  // Handle mouse movement for ripple effect
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mousePos.current = [x, y];
    if (materialRef.current) {
      materialRef.current.uniforms.mouse.value.set(x * 0.5 + 0.5, y * 0.5 + 0.5);
    }
  };

  // Register mouse listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 32, 64]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}
