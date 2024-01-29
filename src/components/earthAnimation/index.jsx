import React, { useMemo, useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame } from "react-three-fiber";
import { BufferAttribute, Vector3, Matrix4, PerspectiveCamera } from "three";

const PARTICLE_COUNT = 1000;
const SCALE = 2;

const EarthPointCloud = () => {
  // This reference will give us direct access to the mesh
  const positionRef = useRef();
  const cameraRef = useRef();
  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const originalPositionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));

  const positions = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    // velocities = new Float32Array(PARTICLE_COUNT * 3);
    // originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() * 2 - 1) * SCALE;
      const y = (Math.random() * 2 - 1) * SCALE;
      const z = (Math.random() * 2 - 1) * SCALE;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositionsRef.current.set([x, y, z], i * 3);

      // velocities[i * 3] = Math.random() * 1;
      // velocities[i * 3 + 1] = Math.random() * 1;
      // velocities[i * 3 + 2] = Math.random() * 1;
    }

    return new BufferAttribute(positions, 3);
  }, []);

  function rotateDestinationAroundYAxis(angle) {
    const originalPositions = originalPositionsRef.current;

    const rotationMatrix = new Matrix4();
    rotationMatrix.makeRotationY(angle);

    for (let i = 0; i < originalPositions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      const vector = new Vector3(x, y, z);
      vector.applyMatrix4(rotationMatrix);

      originalPositions[i] = vector.x;
      originalPositions[i + 1] = vector.y;
      originalPositions[i + 2] = vector.z;
    }
  }

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    rotateDestinationAroundYAxis(delta);

    // const mouse3DPosition = getMouse3DPosition(mouse, camera);
    // repelPointsFromMouse(mouse3DPosition, 1, 0.1);

    const positions = positionRef.current.array;
    const velocities = velocitiesRef.current;
    const originalPositions = originalPositionsRef.current;
    // Update positions based on velocities
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] += velocities[i * 3] * 0.1;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * 0.1;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * 0.1;

      // Lerp back to original position
      positions[i * 3] += (originalPositions[i * 3] - positions[i * 3]) * 0.05;
      positions[i * 3 + 1] +=
        (originalPositions[i * 3 + 1] - positions[i * 3 + 1]) * 0.05;
      positions[i * 3 + 2] +=
        (originalPositions[i * 3 + 2] - positions[i * 3 + 2]) * 0.05;

      // Damping
      velocities[i * 3] *= 0.98;
      velocities[i * 3 + 1] *= 0.98;
      velocities[i * 3 + 2] *= 0.98;
    }

    positionRef.current.needsUpdate = true;
  });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 0, 5]}
      />
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={positionRef}
            attach={"attributes-position"}
            {...positions}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          // threshold={0.1}
          color={0xff00ff}
          sizeAttenuation={true}
        />
      </points>
    </>
  );
};

export const EarthAnimation = () => {
  return (
    <Canvas>
      <EarthPointCloud />
    </Canvas>
  );
};
