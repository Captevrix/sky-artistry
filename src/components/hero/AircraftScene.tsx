import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Stylized low-poly aircraft silhouettes representing the three platforms
 * TRG supports: RQ-4 Global Hawk, AC-130J Ghostrider, MQ-9 Reaper.
 * These are procedural — no external GLB assets required.
 */

type Variant = "rq4" | "ac130" | "mq9";

function Aircraft({ variant, color = "#e6f2ff" }: { variant: Variant; color?: string }) {
  const geometry = useMemo(() => {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.6,
      roughness: 0.35,
      emissive: new THREE.Color(color).multiplyScalar(0.05),
    });

    if (variant === "rq4") {
      // Global Hawk — long slender fuselage, huge straight wings, V-tail
      const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 2.4, 6, 10), mat);
      fuselage.rotation.z = Math.PI / 2;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), mat);
      bulb.position.x = 0.9;
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 5.4), mat);
      wing.position.y = 0.1;
      const vtail1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.7), mat);
      vtail1.position.set(-1.05, 0.25, 0.25);
      vtail1.rotation.x = 0.6;
      const vtail2 = vtail1.clone();
      vtail2.position.z = -0.25;
      vtail2.rotation.x = -0.6;
      group.add(fuselage, bulb, wing, vtail1, vtail2);
    } else if (variant === "ac130") {
      // AC-130J — fat fuselage, high wing, 4 engines, T-tail
      const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 2.8, 8, 12), mat);
      fuselage.rotation.z = Math.PI / 2;
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 5.2), mat);
      wing.position.y = 0.3;
      for (let i = 0; i < 4; i++) {
        const eng = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.5, 4, 8), mat);
        eng.rotation.z = Math.PI / 2;
        eng.position.set(0.15, 0.22, -1.9 + i * 1.3);
        group.add(eng);
      }
      const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.05), mat);
      tailFin.position.set(-1.35, 0.55, 0);
      const hStab = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 1.4), mat);
      hStab.position.set(-1.5, 0.9, 0);
      group.add(fuselage, wing, tailFin, hStab);
    } else {
      // MQ-9 Reaper — slender, V-tail down, single prop tail-mounted, straight wings
      const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 2.0, 6, 10), mat);
      fuselage.rotation.z = Math.PI / 2;
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), mat);
      nose.position.x = 0.85;
      nose.scale.x = 1.4;
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.03, 4.4), mat);
      wing.position.y = 0.05;
      const vtail1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.55), mat);
      vtail1.position.set(-0.9, -0.05, 0.18);
      vtail1.rotation.x = -0.7;
      const vtail2 = vtail1.clone();
      vtail2.position.z = -0.18;
      vtail2.rotation.x = 0.7;
      group.add(fuselage, nose, wing, vtail1, vtail2);
    }
    return group;
  }, [variant, color]);

  return <primitive object={geometry} />;
}

function FlightPath({
  variant,
  speed,
  yOffset,
  zOffset,
  scale,
  phase,
  tilt,
}: {
  variant: Variant;
  speed: number;
  yOffset: number;
  zOffset: number;
  scale: number;
  phase: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * speed + phase) % 1;
    // Sweep left-to-right across a wide arc
    const x = THREE.MathUtils.lerp(-14, 14, t);
    const y = yOffset + Math.sin(t * Math.PI) * 0.6;
    ref.current.position.set(x, y, zOffset);
    ref.current.rotation.y = Math.PI + 0.05;
    ref.current.rotation.z = tilt + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });
  return (
    <group ref={ref} scale={scale}>
      <Aircraft variant={variant} />
    </group>
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
      <fog attach="fog" args={["#0b1424", 10, 28]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#dfeaff" />
      <directionalLight position={[-6, -2, -4]} intensity={0.4} color="#57b8ff" />
      <Suspense fallback={null}>
        <Stars />
        <Clouds />
        <FlightPath variant="rq4" speed={0.05} yOffset={2.2} zOffset={-2} scale={0.7} phase={0} tilt={0.02} />
        <FlightPath variant="ac130" speed={0.035} yOffset={-0.4} zOffset={0} scale={0.95} phase={0.55} tilt={-0.02} />
        <FlightPath variant="mq9" speed={0.07} yOffset={1.0} zOffset={-5} scale={0.55} phase={0.3} tilt={0.03} />
      </Suspense>
    </Canvas>
  );
}
