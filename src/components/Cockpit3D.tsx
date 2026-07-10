"use client";

import { Canvas } from "@react-three/fiber";
import {
  useGLTF, Bounds, OrbitControls, ContactShadows, PerspectiveCamera,
  Environment, Lightformer,
} from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/cockpit.glb");
  return <primitive object={scene} />;
}
useGLTF.preload("/models/cockpit.glb");

export default function Cockpit3D() {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }} className="!touch-none">
      <PerspectiveCamera makeDefault position={[2.9, 1.65, 3.3]} fov={31} />
      <hemisphereLight args={["#ffffff", "#b8a890", 0.55]} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0002} />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} />
      <pointLight position={[-2.5, 1.6, 3]} intensity={16} distance={14} color="#ff7a1a" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.25}>
          <Model />
        </Bounds>
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 3, 1]} color="#fff6ea" />
          <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[3, 3, 1]} color="#ffe6cf" />
          <Lightformer intensity={0.8} position={[4, 2, -2]} scale={[3, 3, 1]} color="#ffffff" />
        </Environment>
      </Suspense>

      <ContactShadows position={[0, -0.78, 0]} opacity={0.45} scale={9} blur={2.6} far={4} color="#2e2008" />
      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
        minDistance={1.2}
        maxDistance={9}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
