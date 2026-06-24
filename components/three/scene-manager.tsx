'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme, themeColors } from '@/lib/theme-context';
import { LiquidSystem } from './liquid-system';
import { FloatingParticles, CursorSystem } from './cursor-system';
import { BackgroundElements } from './background-elements';
import { PostProcessingEffects } from './post-processing';
import { EnergyParticles, VolumetricLights, FloatingStructures, EnergyRibbons } from './continuous-animations';
import { TeamGallery3D } from './team-gallery-3d';
import { CinematicFooter } from './cinematic-footer';

// Advanced scroll-based camera with zone detection
function AdvancedScrollCamera() {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useFrame(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = window.scrollY / scrollHeight;
    
    // Multi-zone camera movement
    let targetZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    if (scrollProgress < 0.15) {
      // Hero zone - gentle introduction
      targetZ = -scrollProgress * 40;
      targetRotX = scrollProgress * 0.02;
    } else if (scrollProgress < 0.4) {
      // Services/Products zone - increased depth
      targetZ = -6 - (scrollProgress - 0.15) * 60;
      targetRotX = 0.03 + (scrollProgress - 0.15) * 0.05;
      targetRotY = Math.sin(scrollProgress * 5) * 0.05;
    } else if (scrollProgress < 0.7) {
      // Team/Features zone - dynamic rotation
      targetZ = -15 - (scrollProgress - 0.4) * 50;
      targetRotX = 0.08 + Math.cos(scrollProgress * 3) * 0.02;
      targetRotY = (scrollProgress - 0.4) * 0.2;
    } else {
      // Footer zone - cinematic finale
      targetZ = -30 - (scrollProgress - 0.7) * 50;
      targetRotX = 0.1 + Math.sin(scrollProgress * 2) * 0.03;
    }

    // Smooth camera interpolation
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.08;
    cameraRef.current.rotation.x += (targetRotX - cameraRef.current.rotation.x) * 0.08;
    cameraRef.current.rotation.y += (targetRotY - cameraRef.current.rotation.y) * 0.08;
  });

  return null;
}

// Dynamic theme-aware scene
function DynamicScene() {
  const { theme } = useTheme();
  const colors = themeColors[theme];

  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.fogColor, 20, 150]} />

      {/* Adaptive lighting */}
      <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
      <pointLight position={[15, 15, 15]} intensity={theme === 'dark' ? 1 : 0.7} color={colors.accent} />
      <pointLight position={[-15, -10, 15]} intensity={theme === 'dark' ? 0.6 : 0.4} color={colors.accentGlow} />
      <pointLight position={[0, 10, -20]} intensity={theme === 'dark' ? 0.5 : 0.3} color="#ff00ff" />

      {/* Premium 3D environment */}
      <AdvancedScrollCamera />
      <CursorSystem />
      <BackgroundElements />
      <VolumetricLights />
      
      {/* Continuous animations throughout */}
      <EnergyParticles count={1000} />
      <FloatingStructures />
      <EnergyRibbons />
      
      {/* Section-specific 3D elements */}
      <LiquidSystem position={[0, 0, -25]} scale={[15, 30, 1]} />
      <FloatingParticles count={600} />
      <TeamGallery3D />
      <CinematicFooter />

      {/* Post-processing for cinematic quality */}
      <PostProcessingEffects />
    </>
  );
}

// Main 3D Scene Component
export function MainScene() {
  const { theme } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 2000 }}
      style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      gl={{
        antialias: true,
        alpha: true,
        pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <DynamicScene />
    </Canvas>
  );
}
