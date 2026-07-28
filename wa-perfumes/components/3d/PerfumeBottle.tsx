'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function PerfumeBottle() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Animate the bottle slightly on its own
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      
      {/* Bottle Body (Glass) */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3, 4, 1.5]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.0}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#D4AF37"
          color="#050505"
        />
      </mesh>

      {/* Liquid Inside */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[2.7, 3.4, 1.2]} />
        <meshPhysicalMaterial 
          color="#8F6A1C" 
          transmission={0.8}
          transparent
          opacity={0.9}
          roughness={0}
          metalness={0.1}
        />
      </mesh>

      {/* Bottle Neck (Gold) */}
      <mesh position={[0, 3.75, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.5, 32]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={1} 
          roughness={0.2} 
        />
      </mesh>

      {/* Bottle Cap (Gold) */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>

      {/* Front Label Plate (Gold) */}
      <mesh position={[0, 1.5, 0.76]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}
