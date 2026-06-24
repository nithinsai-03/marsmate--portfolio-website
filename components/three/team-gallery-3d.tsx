'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Member One', role: 'Vision', color: '#00d9ff' },
  { id: 2, name: 'Member Two', role: 'Innovation', color: '#ff6b00' },
  { id: 3, name: 'Member Three', role: 'Strategy', color: '#ff00ff' },
  { id: 4, name: 'Member Four', role: 'Engineering', color: '#00ff88' },
];

export function TeamGallery3D() {
  const groupRef = useRef<THREE.Group>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { camera } = useThree();

  const positions = useMemo(() => {
    const radius = 20;
    return teamMembers.map((_, i) => {
      const angle = (i / teamMembers.length) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotate gallery based on active member
      groupRef.current.rotation.y += 0.01;

      // Spotlight effect on active member
      teamMembers.forEach((member, i) => {
        const intensity = i === activeIndex ? 2 : 0.5;
        // Would apply to lights in real implementation
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -60]}>
      {/* Spotlight effect */}
      <pointLight
        position={[0, 30, 0]}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      {/* Team member showcase chambers */}
      {teamMembers.map((member, i) => {
        const pos = positions[i];
        return (
          <group key={member.id} position={[pos.x, 0, pos.z]}>
            {/* Glass chamber background */}
            <mesh>
              <cylinderGeometry args={[3, 3, 8, 32]} />
              <meshPhysicalMaterial
                color={member.color}
                transmission={0.7}
                opacity={0.4}
                metalness={0.3}
                roughness={0.2}
                emissive={member.color}
                emissiveIntensity={i === activeIndex ? 0.8 : 0.2}
              />
            </mesh>

            {/* Floating accent ring */}
            <mesh position={[0, 4, 0]}>
              <torusGeometry args={[3.5, 0.15, 32, 100]} />
              <meshStandardMaterial
                color={member.color}
                emissive={member.color}
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Particle halo */}
            <ParticleHalo color={member.color} index={i} active={i === activeIndex} />
          </group>
        );
      })}

      {/* Navigation controls info */}
      <group position={[0, -15, 0]}>
        {teamMembers.map((member, i) => (
          <mesh
            key={`button-${member.id}`}
            position={[i * 8 - 12, 0, 3]}
            onClick={() => setActiveIndex(i)}
          >
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshPhysicalMaterial
              color={i === activeIndex ? member.color : '#ffffff'}
              emissive={member.color}
              emissiveIntensity={i === activeIndex ? 0.8 : 0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Particle halo around team member
function ParticleHalo({
  color,
  index,
  active,
}: {
  color: string;
  index: number;
  active: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 50;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + clock.elapsedTime;
        const radius = 5 + Math.sin(clock.elapsedTime * (index + 1)) * 1;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle + clock.elapsedTime) * 2;
        const z = Math.cos(angle * 0.5) * 1;

        dummy.position.set(x, y, z);
        dummy.scale.set(
          active ? 0.3 : 0.15,
          active ? 0.3 : 0.15,
          active ? 0.3 : 0.15
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}
