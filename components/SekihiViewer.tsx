"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import * as THREE from "three";

function PointCloud() {
  const geometry = useLoader(
    PLYLoader,
    "/横国石碑.ply"
  ) as THREE.BufferGeometry;

  const hasColors = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    if (box) {
      const center = box.getCenter(new THREE.Vector3());
      geometry.translate(-center.x, -center.y, -center.z);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0 && Number.isFinite(maxDim)) {
        const scale = 2.6 / maxDim;
        geometry.scale(scale, scale, scale);
      }
      geometry.computeBoundingBox();
    }
    if (!geometry.attributes.normal) {
      geometry.computeVertexNormals();
    }
    geometry.rotateX(Math.PI);
    return !!geometry.attributes.color;
  }, [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.005}
        sizeAttenuation
        color="#5BA3E0"
        transparent
        opacity={0.95}
      />
    </points>
  );
}

function ViewOffset({ ratio }: { ratio: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (typeof cam.setViewOffset !== "function") return;
    cam.setViewOffset(
      size.width,
      size.height,
      ratio * size.width,
      0,
      size.width,
      size.height
    );
    return () => {
      cam.clearViewOffset();
    };
  }, [camera, size.width, size.height, ratio]);
  return null;
}

export default function SekihiViewer() {
  return (
    <Canvas
      camera={{ position: [3.2, 1.6, 4.6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={0.8} />
      <directionalLight position={[-4, 3, -3]} intensity={0.3} />

      <ViewOffset ratio={-0.18} />

      <Suspense
        fallback={
          <Html center>
            <div className="text-xs tracking-[0.3em] text-white/70">
              Loading...
            </div>
          </Html>
        }
      >
        <PointCloud />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.9}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
