import React from "react";
import { extend, Canvas } from "react-three-fiber";
import { ShaderMaterial } from "three";
import { Particles } from "./Particles";

extend({ ShaderMaterial });

export const EarthAnimation = () => {
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 5] }} >
      <Particles numParticles={1000} />
    </Canvas>
  );
};
