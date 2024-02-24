import React, {
  FC,
  Ref,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, Size, useFrame, useThree } from "react-three-fiber";
import { useTexture } from "@react-three/drei";
import {
  BufferAttribute,
  Vector2,
  Vector3,
  Matrix4,
  TextureLoader,
  Color,
} from "three";


const PARTICLE_COUNT = 100000;

/** Computes the scale and offsets at a given screen size */
const getScaleAndOffset = (size: Size) => {
  const scale = size.width < 600 ? 1.25 : 2;

  const yOffset = 0
  const offset = new Vector3(0, yOffset, 0);
  return { scale, offset };
}

type EarthPointCloudProps = {
  setLoaded: () => void;
}

const EarthPointCloud: FC<EarthPointCloudProps> = ({ setLoaded }) => {
  // This reference will give us direct access to the mesh
  const { camera, size } = useThree();
  const bufferRef: Ref<BufferAttribute> = useRef(null);

  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const currentPositionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const originalPositionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));

  const { scale: initialScale, offset: initialOffset } = getScaleAndOffset(size);
  const [scale, setScale] = useState(initialScale);
  const [offset, setOffset] = useState(initialOffset);
  useEffect(() => {
    const { scale, offset } = getScaleAndOffset(size);
    setScale(scale);
    setOffset(offset);
  }, [size]);

  const texture = useTexture("/bump.jpg");

  const [followSpeed, setFollowSpeed] = useState(1);

  const [positions, setPositions] = useState<BufferAttribute | null>(null);
  const [colors, setColors] = useState<BufferAttribute | null>(null);

  useEffect(() => {
    // Create a canvas to read pixel data from the texture
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Unsupported canvas context");
    }

    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    context.drawImage(texture.image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Create the point cloud based on the texture data
    const [points, colors] = createPointCloud(imageData);

    originalPositionsRef.current = points.slice();
    const scaledPositions = points.slice();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      scaledPositions[i * 3] = (points[i * 3] + offset.x) * scale;
      scaledPositions[i * 3 + 1] = (points[i * 3 + 1] + offset.y) * scale;
      scaledPositions[i * 3 + 2] = (points[i * 3 + 2] + offset.z) * scale;
    }
    currentPositionsRef.current = scaledPositions.slice();

    setPositions(new BufferAttribute(points, 3));
    setColors(new BufferAttribute(colors, 3));
    setLoaded();
  }, []);

  // Create the point cloud geometry based on the bump map data
  function createPointCloud(imageData: ImageData) {
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
      let color = new Color(0x6f9b59); // Green for land
      let landElevation = 1.05; // Slightly elevated for land
      if (bumpValue > 50) {
        // If the bump map value indicates ocean
        landElevation = 1;
        color = new Color(0x2d467f); // Blue for ocean
      }

      // Calculate the final position of the particle
      const x = vector.x * landElevation;
      const y = vector.y * landElevation;
      const z = vector.z * landElevation;

      // Store the positions and colors in the arrays
      positions.set([x, y, z], i * 3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions.slice(), colors.slice()];
  }

  // Function to repel points away from the mouse cursor
  function repelPointsFromMouse(
    mouse2DPosition: Vector2,
    repulsionDistance: number,
    repulsionStrength: number,
    mouseDelta: number
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
  function toScreenPosition(pointPosition: Vector3) {
    const vector = new Vector3();

    // obj is a vector3
    vector.copy(pointPosition);

    // Map to normalized device coordinate (NDC) space
    vector.project(camera);

    return new Vector2(vector.x, vector.y);
  }

  function rotateDestinationAroundYAxis(angle: number) {
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

  function calculateMouseDelta(prevPointer: Vector2, currentPointer: Vector2) {
    const delta = new Vector2().subVectors(currentPointer, prevPointer);
    return delta.length();
  }

  const realPointer = useRef(new Vector2(0, -2));
  const prevPointer = useRef(new Vector2(0, 0));

  useEffect(() => {
    // Normalise to canvas space. Because the canvas is full screen with 2x height. Map to x to -1 to 1 and y to -1 to 0
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) + 1;
      realPointer.current.set(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, [])

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // I am not using the pointer object as that gets blocked by components above the canvas
  useFrame((_, delta) => {
    if (!bufferRef.current) {
      return;
    }
    if (delta > 0.3) {
      delta = 0.3;
    }

    rotateDestinationAroundYAxis(delta * 0.05);

    const pointer = realPointer.current;
    const mouseDelta = calculateMouseDelta(prevPointer.current, pointer);
    prevPointer.current = pointer.clone();
    if (mouseDelta > 0 && size.width > 768) {
      repelPointsFromMouse(pointer, 0.15, 3, mouseDelta);
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
      positions[i * 3] += ((originalPositions[i * 3] + offset.x) * scale - positions[i * 3]) * 0.05 * followSpeed;
      positions[i * 3 + 1] += ((originalPositions[i * 3 + 1] + offset.y) * scale - positions[i * 3 + 1]) * 0.05 * followSpeed;
      positions[i * 3 + 2] += ((originalPositions[i * 3 + 2] + offset.z) * scale - positions[i * 3 + 2]) * 0.05 * followSpeed;

      // Damping
      velocities[i * 3] *= 0.98;
      velocities[i * 3 + 1] *= 0.98;
      velocities[i * 3 + 2] *= 0.98;

      // Write to the buffer
      if (positions[i * 3 + 2] < -0.2) {
        buffer[i * 3] = 0;
        buffer[i * 3 + 1] = 0;
        buffer[i * 3 + 2] = 0;
      } else {
        buffer[i * 3] = positions[i * 3];
        buffer[i * 3 + 1] = positions[i * 3 + 1];
        buffer[i * 3 + 2] = positions[i * 3 + 2];
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  if (!positions || !colors) {
    return null;
  }

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={bufferRef}
          attach={"attributes-position"}
          {...positions}
        />
        <bufferAttribute attach={"attributes-color"} {...colors} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        // threshold={0.1}
        vertexColors={true}
      />
    </points>
  );
};

type EarthAnimationProps = {
  setLoaded: () => void;
};

export const EarthAnimation: FC<EarthAnimationProps> = ({ setLoaded }) => {
  return (
    <div className="h-screen overflow-hidden">  
      <Canvas className="w-screen overflow-hidden" style={{ height: "200vh" }}>
        <Suspense fallback={null}>
          <EarthPointCloud setLoaded={setLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
};
