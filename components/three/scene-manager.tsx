'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { LiquidSystem } from './liquid-system';
import { FloatingParticles, CursorSystem } from './cursor-system';
import { BackgroundElements } from './background-elements';
import { PostProcessingEffects } from './post-processing';

// Component to handle scroll-based camera movement
function ScrollCamera() {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useFrame(() => {
    // Move camera along Z-axis based on document scroll
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const scrollZ = -scrollProgress * 80;
    
    // Smooth camera movement
    cameraRef.current.position.z += (scrollZ - cameraRef.current.position.z) * 0.1;
    
    // Subtle pitch rotation based on scroll
    cameraRef.current.rotation.x += (scrollProgress * 0.05 - cameraRef.current.rotation.x) * 0.1;
  });

  return null;
}

// Main 3D Scene Component
export function MainScene() {
  const canvasRef = useRef(null);

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 1000 }}
      style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      gl={{
        antialias: true,
        alpha: true,
        pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
        powerPreference: 'high-performance',
      }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 20, 100]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.4} color="#ff6b00" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#00d9ff" />

      {/* Scene Elements */}
      <ScrollCamera />
      <CursorSystem />
      <BackgroundElements />
      <LiquidSystem position={[0, 0, -25]} scale={[15, 30, 1]} />
      <FloatingParticles count={600} />

      {/* Post-processing Effects */}
      <PostProcessingEffects />
    </Canvas>
  );
}
