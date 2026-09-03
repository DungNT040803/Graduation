import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GraduationCap({ onClick }) {
  const groupRef = useRef();
  const hatRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} onClick={onClick} scale={1.5}>
        {/* Board (flat top of the cap) */}
        <mesh position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.8, 0.06, 1.8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.4} />
        </mesh>

        {/* Cap body (cylinder) */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 0.5, 6]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.5} />
        </mesh>

        {/* Button on top */}
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FFD93D" metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Tassel cord */}
        <mesh position={[0.3, 0.63, 0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
          <meshStandardMaterial color="#FFD93D" />
        </mesh>

        {/* Tassel end */}
        <mesh position={[0.3, 0.28, 0.3]}>
          <cylinderGeometry args={[0.04, 0.01, 0.15, 8]} />
          <meshStandardMaterial color="#FFD93D" metalness={0.3} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const mesh = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorOptions = [
      [1, 0.85, 0.24],    // gold
      [1, 0.42, 0.42],    // red
      [0.42, 0.8, 0.47],  // green
      [0.65, 0.42, 1],    // purple
      [0.31, 0.8, 0.77],  // cyan
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 8 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Slowly fall down
      positions[i * 3 + 1] -= 0.008;

      // Add wobble
      positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;

      // Reset when below view
      if (positions[i * 3 + 1] < -3) {
        positions[i * 3 + 1] = 6;
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function StarField() {
  const count = 200;
  const mesh = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export { GraduationCap, Particles, StarField };
