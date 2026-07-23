import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import rq4Asset from "../../assets/rq4.png.asset.json";
import ac130jAsset from "../../assets/ac130j.png.asset.json";
import mq9Asset from "../../assets/mq9.png.asset.json";

/**
 * Textured plane meshes displaying the actual DoD aircraft silhouettes
 * used across TRG's mission sets: RQ-4 Global Hawk, AC-130J Ghostrider, MQ-9 Reaper.
 */

type AircraftDef = {
  url: string;
  aspect: number; // width / height of source PNG
  facesRight: boolean; // whether the artwork's nose points in +X
  size: number; // world-space width
  yOffset: number;
  zOffset: number;
  speed: number;
  phase: number;
  tilt: number;
};

const AIRCRAFT: AircraftDef[] = [
  {
    // RQ-4 Global Hawk — source PNG faces right
    url: rq4Asset.url,
    aspect: 415 / 210,
    facesRight: true,
    size: 3.4,
    yOffset: 2.1,
    zOffset: -2,
    speed: 0.05,
    phase: 0,
    tilt: 0.03,
  },
  {
    // AC-130J Ghostrider — source PNG faces right
    url: ac130jAsset.url,
    aspect: 1224 / 473,
    facesRight: true,
    size: 5.6,
    yOffset: -0.5,
    zOffset: 0,
    speed: 0.035,
    phase: 0.55,
    tilt: -0.02,
  },
  {
    // MQ-9 Reaper — source PNG is "MQ-9-Left" (nose points left)
    url: mq9Asset.url,
    aspect: 696 / 564,
    facesRight: false,
    size: 2.8,
    yOffset: 1.0,
    zOffset: -5,
    speed: 0.06,
    phase: 0.3,
    tilt: 0.04,
  },
];

function AircraftSprite({ def }: { def: AircraftDef }) {
  const texture = useLoader(THREE.TextureLoader, def.url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  const ref = useRef<THREE.Mesh>(null);
  const width = def.size;
  const height = def.size / def.aspect;

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * def.speed + def.phase) % 1;
    // Fly in the direction the aircraft is facing.
    // facesRight → travels left → right (x: -14 → +14)
    // facesLeft  → travels right → left (x: +14 → -14)
    const x = def.facesRight
      ? THREE.MathUtils.lerp(-14, 14, t)
      : THREE.MathUtils.lerp(14, -14, t);
    const y = def.yOffset + Math.sin(t * Math.PI) * 0.5;
    ref.current.position.set(x, y, def.zOffset);
    // No Y flip — textured planes keep their artwork orientation.
    ref.current.rotation.z = def.tilt + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.015;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Clouds() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.position.x = -((s.clock.elapsedTime * 0.15) % 20);
  });
  const puffs = useMemo(() => {
    const arr: { pos: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < 22; i++) {
      arr.push({
        pos: [(i * 2.4) % 24 - 12 + Math.random() * 2, -3 - Math.random() * 1.5, -8 - Math.random() * 6],
        s: 1.2 + Math.random() * 1.8,
      });
    }
    return arr;
  }, []);
  return (
    <group ref={ref}>
      {puffs.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.s, 10, 8]} />
          <meshStandardMaterial color="#4a6b8a" transparent opacity={0.18} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = Math.random() * 12 + 2;
      arr[i * 3 + 2] = -Math.random() * 20 - 4;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a8c8ff" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function AircraftScene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas
      camera={{ position: [0, 0.5, 8], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "never" : "always"}
    >
      <color attach="background" args={["#0b1424"]} />
      <fog attach="fog" args={["#0b1424", 12, 30]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={0.8} color="#dfeaff" />
      <Suspense fallback={null}>
        <Stars />
        <Clouds />
        {AIRCRAFT.map((def, i) => (
          <AircraftSprite key={i} def={def} />
        ))}
      </Suspense>
    </Canvas>
  );
}
