import { writeFileSync } from "fs";
import React, {
  Ref,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  extend,
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "react-three-fiber";
import {
  BufferAttribute,
  Vector2,
  Vector3,
  Matrix4,
  TextureLoader,
  Color,
} from "three";
import { ShaderMaterial } from "three";
import vertexShader from "./vertexShader.glsl"; // Your vertex shader code
import fragmentShader from "./fragmentShader.glsl"; // Your fragment shader code here

let prevTime = performance.now();
let frames = 0;
extend({ ShaderMaterial });

const EarthPointCloud = () => {
  // This reference will give us direct access to the mesh
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      // any other uniforms you might need
    }),
    []
  );

  const [positions, setPositions] = useState<BufferAttribute | null>(null);
  const [colors, setColors] = useState<BufferAttribute | null>(null);

  useEffect(() => {
    const load = async () => {
      const [positionsRaw, colorsRaw] = await Promise.all([
        fetch("earthPoints.json").then((result) => result.json()),
        fetch("earthColors.json").then((result) => result.json()),
      ]);
      console.log(positionsRaw);
      const positions = new Float32Array(positionsRaw);
      const colors = new Float32Array(colorsRaw);

      setPositions(new BufferAttribute(positions, 3));
      setColors(new BufferAttribute(colors, 3));
    };

    load();
  }, []);

  // Update uniforms on each frame, if needed
  useFrame((state) => {
    frames++;
    uniforms.time.value = state.clock.getElapsedTime() * 0.4;
    // Update other uniforms as necessary
    const time = performance.now();
    if (time >= prevTime + 1000) {
      console.log((frames * 1000) / (time - prevTime));

      prevTime = time;
      frames = 0;
    }
  });

  if (!positions || !colors) {
    return null;
  }

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
      <perspectiveCamera
        fov={75}
        aspect={size.width / size.height}
        near={0.1}
        far={1000}
        position={[0, 0, 5]}
      />
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute attach={"attributes-position"} {...positions} />
          <bufferAttribute attach={"attributes-color"} {...colors} />{" "}
        </bufferGeometry>
        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms,
              vertexShader,
              fragmentShader,
              // Other material properties as needed
              vertexColors: true,
            },
          ]}
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
