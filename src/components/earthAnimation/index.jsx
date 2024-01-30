import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame, useLoader } from "react-three-fiber";
import {
  BufferAttribute,
  Vector3,
  Matrix4,
  PerspectiveCamera,
  TextureLoader,
  Color,
} from "three";

const PARTICLE_COUNT = 100000;
const SCALE = 2;

const EarthPointCloud = () => {
  // This reference will give us direct access to the mesh
  const positionRef = useRef();
  const cameraRef = useRef();
  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const originalPositionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));

  const texture = useLoader(TextureLoader, "/bump.png");

  const [positions, colors] = useMemo(() => {
    // Create a canvas to read pixel data from the texture
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    context.drawImage(texture.image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Create the point cloud based on the texture data
    const [points, colors] = createPointCloud(imageData);

    originalPositionsRef.current = points.slice();

    return [new BufferAttribute(points, 3), new BufferAttribute(colors, 3)];
  }, []);

  // Create the point cloud geometry based on the bump map data
  function createPointCloud(imageData) {
    // Initialize arrays for positions and colors of the particles
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const positions = new Float32Array(PARTICLE_COUNT * 3);

    // TODO: Multiply the matrices
    // Create rotation matrices to orient the Earth correctly
    const rotationMatrixOne = new Matrix4();
    rotationMatrixOne.makeRotationX(-Math.PI / 2); // Rotate around X-axis
    const rotationMatrixTwo = new Matrix4();
    rotationMatrixTwo.makeRotationZ((-Math.PI / 180) * 23.5); // Tilt the Earth by 23.5 degrees

    // Populate the positions and colors arrays based on the texture data
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Calculate spherical coordinates for each particle
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;

      // Convert spherical coordinates to Cartesian coordinates
      const vector = new Vector3(
        Math.cos(theta) * Math.sin(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(phi)
      );

      // Apply the rotation to align the Earth correctly
      vector.applyMatrix4(rotationMatrixOne);
      vector.applyMatrix4(rotationMatrixTwo);

      // Read pixel data from the bump map to determine the color of the particle
      const u = (theta / (2 * Math.PI)) * imageData.width;
      const v = (phi / Math.PI) * imageData.height;
      const colorIndex = (Math.floor(u) + Math.floor(v) * imageData.width) * 4;
      const bumpValue = imageData.data[colorIndex]; // Assuming a grayscale bump map

      // Set the color and elevation for land and ocean
      let color = new Color(0x00ff00); // Green for land
      let landElevation = 1.05; // Slightly elevated for land
      if (bumpValue > 0) {
        // If the bump map value indicates ocean
        landElevation = 1;
        color = new Color(0x0000ff); // Blue for ocean
      }

      // Calculate the final position of the particle
      const x = vector.x * landElevation * SCALE;
      const y = vector.y * landElevation * SCALE;
      const z = vector.z * landElevation * SCALE;

      // Store the positions and colors in the arrays
      positions.set([x, y, z], i * 3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    // Create the point cloud and add it to the scene
    // setPoints({
    //   positions: particleGoalPositions.slice(),
    //   colors: colors.slice(),
    // });

    return [positions.slice(), colors.slice()];
  }

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
    rotateDestinationAroundYAxis(delta * 0.5);

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
          <bufferAttribute attach={"attributes-color"} {...colors} />{" "}
        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          // threshold={0.1}
          vertexColors={true}
        />
      </points>
    </>
  );
};

export const EarthAnimation = () => {
  return (
    <Canvas style={{ width: "500px", height: "500px" }}>
      <Suspense fallback={null}>
        <EarthPointCloud />
      </Suspense>
    </Canvas>
  );
};
