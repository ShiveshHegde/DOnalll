'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GemProps {
  onGemClick: () => void;
  isAnimating: boolean;
}

function Gem({ onGemClick, isAnimating }: GemProps) {
  const gemRef = useRef<THREE.Group>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useFrame(() => {
    if (gemRef.current) {
      if (isSpinning) {
        gemRef.current.rotation.x += 0.08;
        gemRef.current.rotation.y += 0.08;
        gemRef.current.rotation.z += 0.08;
      } else {
        gemRef.current.rotation.x += 0.003;
        gemRef.current.rotation.y += 0.005;
        gemRef.current.rotation.z += 0.002;
      }
    }
  });

  useEffect(() => {
    if (isAnimating) {
      setIsSpinning(true);
      const timer = setTimeout(() => setIsSpinning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleClick = () => {
    onGemClick();
  };

  return (
    <group ref={gemRef} onClick={handleClick} position={[0, 0, 0]}>
      <Icosahedron args={[1.5, 4]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#EC4899"
          metalness={0.9}
          roughness={0.15}
          emissive="#8B5CF6"
          emissiveIntensity={0.4}
          wireframe={false}
        />
      </Icosahedron>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0003;
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  // Create particle positions
  const particleCount = 300;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FBBF24"
        size={0.1}
        sizeAttenuation={true}
        opacity={0.6}
      />
    </Points>
  );
}

function Scene({ onGemClick, isAnimating }: GemProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} castShadow color="#FF69B4" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#8B5CF6" />
      <Gem onGemClick={onGemClick} isAnimating={isAnimating} />
      <ParticleField />
    </>
  );
}

interface GemSceneProps {
  onGemClick: () => void;
  isAnimating: boolean;
}

export function GemScene({ onGemClick, isAnimating }: GemSceneProps) {
  return (
    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} shadows>
        <Scene onGemClick={onGemClick} isAnimating={isAnimating} />
      </Canvas>
    </div>
  );
}
