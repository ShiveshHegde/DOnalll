'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

interface GemProps {
  onGemClick: () => void;
  isAnimating: boolean;
  gemColor?: string;
  level?: number;
}

function Gem({ onGemClick, isAnimating, gemColor = '#EC4899', level = 1 }: GemProps) {
  const gemRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const glowRef = useRef(0.4);

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
      
      // Pulsing glow effect
      glowRef.current += 0.01;
      const pulse = Math.sin(glowRef.current) * 0.3 + 0.6;
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = pulse * (level / 5);
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
          ref={materialRef}
          color={gemColor}
          metalness={0.9}
          roughness={0.15}
          emissive={gemColor}
          emissiveIntensity={0.4}
          wireframe={false}
        />
      </Icosahedron>
    </group>
  );
}

function ParticleField({ level = 1 }: { level?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const timeRef = useRef(0);
  
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0003;
      pointsRef.current.rotation.y += 0.0005;
    }
    
    // Animate particle size based on level
    if (materialRef.current) {
      timeRef.current += 0.01;
      materialRef.current.size = 0.1 + Math.sin(timeRef.current) * 0.05;
    }
  });

  // Create particles on mount
  const particleCount = 300 + level * 50;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorMap = [
    { r: 0.93, g: 0.50, b: 0.6 },  // pink
    { r: 0.55, g: 0.35, b: 0.96 }, // purple
    { r: 0.02, g: 0.71, b: 0.77 }, // cyan
    { r: 1, g: 0.75, b: 0.14 },    // gold
  ];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;

    const colorIdx = Math.floor(Math.random() * colorMap.length);
    const color = colorMap[colorIdx];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation={true}
        opacity={0.6 + level * 0.05}
      />
    </points>
  );
}

function Scene({ onGemClick, isAnimating, gemColor, level }: GemProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} castShadow color="#FF69B4" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color={gemColor || '#EC4899'} />
      <Gem onGemClick={onGemClick} isAnimating={isAnimating} gemColor={gemColor} level={level} />
      <ParticleField level={level} />
    </>
  );
}

interface GemSceneProps {
  onGemClick: () => void;
  isAnimating: boolean;
  gemColor?: string;
  level?: number;
}

export function GemScene({ onGemClick, isAnimating, gemColor, level }: GemSceneProps) {
  return (
    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} shadows>
        <Scene onGemClick={onGemClick} isAnimating={isAnimating} gemColor={gemColor} level={level} />
      </Canvas>
    </div>
  );
}
