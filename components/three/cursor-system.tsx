'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CursorSystemProps {
  onCursorMove?: (position: { x: number; y: number }) => void;
}

export function CursorSystem({ onCursorMove }: CursorSystemProps) {
  const { camera, raycaster, mouse, scene } = useThree();
  const raycasterRef = useRef(raycaster);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [particleGroup, setParticleGroup] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      cursorRef.current = { x, y };
      raycasterRef.current.setFromCamera(mouse, camera);

      onCursorMove?.({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, mouse, onCursorMove]);

  useFrame(() => {
    // This component primarily handles mouse tracking
    // Actual interactions are handled by specific system components
  });

  return null;
}

// Floating particle system that reacts to cursor
export function FloatingParticles({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const cursorPosRef = useRef<[number, number]>([0, 0]);

  // Initialize particles
  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesRef.current = positions;
    velocitiesRef.current = velocities;

    const material = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    if (pointsRef.current) {
      pointsRef.current.geometry = geometry;
      pointsRef.current.material = material;
    }
  }, [count]);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorPosRef.current = [e.clientX / window.innerWidth, e.clientY / window.innerHeight];
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update particles
  useFrame(() => {
    if (pointsRef.current && particlesRef.current && velocitiesRef.current) {
      const positions = particlesRef.current;
      const velocities = velocitiesRef.current;

      for (let i = 0; i < count; i++) {
        // Apply velocity
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap around boundaries
        if (Math.abs(positions[i * 3]) > 20) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 15) velocities[i * 3 + 2] *= -1;

        // Cursor attraction
        const cursorDist = Math.hypot(
          cursorPosRef.current[0] * 20 - positions[i * 3],
          cursorPosRef.current[1] * 20 - positions[i * 3 + 1]
        );

        if (cursorDist < 8) {
          const strength = (8 - cursorDist) / 8 * 0.002;
          velocities[i * 3] += strength * ((cursorPosRef.current[0] * 20) - positions[i * 3]);
          velocities[i * 3 + 1] += strength * ((cursorPosRef.current[1] * 20) - positions[i * 3 + 1]);
        }

        // Damping
        velocities[i * 3] *= 0.99;
        velocities[i * 3 + 1] *= 0.99;
        velocities[i * 3 + 2] *= 0.99;
      }

      (pointsRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
    }
  });

  return <points ref={pointsRef} />;
}
