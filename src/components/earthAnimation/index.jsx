import React, { Suspense, useMemo, useRef, useState } from "react";
import {
  Canvas,
  ThreeElements,
  useFrame,
  useLoader,
  useThree,
} from "react-three-fiber";
import {
  BufferAttribute,
  Vector2,
  Vector3,
  Matrix4,
  PerspectiveCamera,
  TextureLoader,
  Color,
} from "three";

const PARTICLE_COUNT = 100000;
const SCALE = 0.025;
const DEPTH = 0.5;

const EarthPointCloud = () => {
  // This reference will give us direct access to the mesh
  const { camera, size } = useThree();
  const bufferRef = useRef();
  const canvasRef = useRef();

  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const currentPositionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const originalPositionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));

  const texture = useLoader(TextureLoader, "/logo.png"); // Load your logo here

  const [positions, colors] = useMemo(() => {
    // Create a canvas to read pixel data from the logo image
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    context.drawImage(texture.image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Create the point cloud based on the logo data
    const [points, colors] = createPointCloudFromLogo(imageData);

    originalPositionsRef.current = points.slice();
    currentPositionsRef.current = points.slice();

    return [new BufferAttribute(points, 3), new BufferAttribute(colors, 3)];
  }, []);

  function createPointCloudFromLogo(imageData) {
    // Initialize arrays for positions and colors
    const visiblePixels = [];
    const edges = [];
    for (let y = 0; y < imageData.height; y++) {
      let wasPrevXVisable = false;
      for (let x = 0; x < imageData.width; x++) {
        const index = (x + y * imageData.width) * 4;
        if (imageData.data[index + 3] > 128) {
          if (!wasPrevXVisable) {
            edges.push({ x, y, index });
            wasPrevXVisable = true;
          }
          // Assuming pixel is visible if opacity > 50%
          visiblePixels.push({ x, y, index });
        } else if (wasPrevXVisable) {
          edges.push({ x: x - 1, y, index });
          wasPrevXVisable = false;
        }
      }
    }

    // Sample points based on PARTICLE_COUNT
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    visiblePixels.forEach((point, i) => {
      const { x, y, index } = point;
      positions.set(
        [
          (x - imageData.width / 2) * SCALE,
          (y - imageData.height / 2) * SCALE,
          DEPTH / 2,
        ],
        i * 3
      ); // Adjust for 3D position, depth could be added here
      positions.set(
        [
          (x - imageData.width / 2) * SCALE,
          (y - imageData.height / 2) * SCALE,
          -DEPTH / 2,
        ],
        visiblePixels.length * 3 + i * 3
      );
      // Set color, converting from [0, 255] to [0, 1] range
      const color = new Color(0xffffff);
      colors.set([color.r, color.g, color.b], i * 3);
    });

    edges.forEach((point, i) => {
      const { x, y, index } = point;
      const EDGE_POINTS = 20;
      for (let d = 0; d < EDGE_POINTS; d++) {
        positions.set(
          [
            (x - imageData.width / 2) * SCALE,
            (y - imageData.height / 2) * SCALE,
            DEPTH / 2 - ((d + 1) * DEPTH / (EDGE_POINTS + 2)),
          ],
          visiblePixels.length * 6 + i * 3 * EDGE_POINTS + d * 3
          );

          const color = new Color(0xffffff);
          colors.set([color.r, color.g, color.b], visiblePixels.length * 6 + i * 3 * EDGE_POINTS + d * 3);
      }
    });

    return [positions, colors];
  }

  // Function to repel points away from the mouse cursor
  function repelPointsFromMouse(
    mouse2DPosition,
    repulsionDistance,
    repulsionStrength,
    mouseDelta
  ) {
    const velocities = velocitiesRef.current;
    const currentPositions = currentPositionsRef.current;
    const scaledRepulsionStrength = repulsionStrength * mouseDelta;

    // Loop through each particle and apply repulsion if within range
    for (let i = 0; i < currentPositions.length; i += 3) {
      const pointPosition = new Vector3(
        currentPositions[i],
        currentPositions[i + 1],
        currentPositions[i + 2]
      );
      const screenPosition = toScreenPosition(pointPosition);
      const distance = mouse2DPosition.distanceTo(screenPosition);

      // Apply repulsion if the particle is within the repulsion distance
      if (distance < repulsionDistance) {
        const direction = new Vector2(
          screenPosition.x - mouse2DPosition.x,
          screenPosition.y - mouse2DPosition.y
        );
        direction.normalize().multiplyScalar(scaledRepulsionStrength);

        // Apply the repulsion in the X and Y directions
        velocities[i] += direction.x;
        velocities[i + 1] -= direction.y; // Y axis is inverted in screen space
      }
    }
  }

  // Convert a 3D position to a 2D screen position
  function toScreenPosition(obj) {
    const vector = new Vector3();

    // obj is a vector3
    vector.copy(obj);

    // Map to normalized device coordinate (NDC) space
    vector.project(camera);

    // Map to 2D screen space
    // return new Vector2(
    //   Math.round(((vector.x + 1) * size.width) / 2),
    //   Math.round(((-vector.y + 1) * size.height) / 2)
    // );
    return vector;
  }

  function rotateDestinationAroundYAxis(angle) {
    const originalPositions = originalPositionsRef.current;

    // Offset the Y-axis rotation by 23.5 degrees to simulate Earth's axial tilt
    const axialTilt = 23.5 * (Math.PI / 180); // Convert to radians
    const tiltedAxis = new Vector3(Math.sin(axialTilt), Math.cos(axialTilt), 0);

    // Create a rotation matrix around the tilted axis
    const rotationMatrix = new Matrix4();
    rotationMatrix.makeRotationAxis(tiltedAxis, angle);

    // Apply the rotation to each particle
    for (let i = 0; i < originalPositions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      const vector = new Vector3(x, y, z);
      vector.applyMatrix4(rotationMatrix);

      // Update the positions array with the new positions
      originalPositions[i] = vector.x;
      originalPositions[i + 1] = vector.y;
      originalPositions[i + 2] = vector.z;
    }
  }

  function calculateMouseDelta(prevPointer, currentPointer) {
    const delta = new Vector2().subVectors(currentPointer, prevPointer);
    return delta.length();
  }

  const prevPointer = useRef(new Vector2(0, 0));

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ pointer }, delta) => {
    if (delta > 0.3) {
      delta = 0.3;
    }
    rotateDestinationAroundYAxis(delta * 0.4);

    const mouseDelta = calculateMouseDelta(prevPointer.current, pointer);
    prevPointer.current = pointer.clone();
    if (mouseDelta > 0) {
      repelPointsFromMouse(pointer, 0.2, 5, mouseDelta);
    }

    const originalPositions = originalPositionsRef.current;
    const positions = currentPositionsRef.current;
    const velocities = velocitiesRef.current;
    const buffer = bufferRef.current.array;
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

      // Write to the buffer
      // if (positions[i * 3 + 2] < -0.2) {
      //   buffer[i * 3] = 0;
      //   buffer[i * 3 + 1] = 0;
      //   buffer[i * 3 + 2] = 0;
      // } else {
      buffer[i * 3] = positions[i * 3];
      buffer[i * 3 + 1] = positions[i * 3 + 1];
      buffer[i * 3 + 2] = positions[i * 3 + 2];
      // }
    }

    bufferRef.current.needsUpdate = true;
  });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
      <perspectiveCamera
        fov={75}
        aspect={size.width / window.height}
        near={0.1}
        far={1000}
        position={[0, 0, 5]}
      />
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={bufferRef}
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
    <Canvas>
      <Suspense fallback={null}>
        <EarthPointCloud />
      </Suspense>
    </Canvas>
  );
};
