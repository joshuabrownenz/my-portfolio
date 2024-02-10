import React, { useEffect, useState } from "react";
import { extend, Canvas } from "react-three-fiber";
import { ShaderMaterial } from "three";
import { Particles } from "./Particles";

extend({ ShaderMaterial });

export const EarthAnimation = () => {
  const [numParticles, setNumParticles] = useState(0);
  const [initialPositions, setInitialPositions] = useState<Float32Array>(new Float32Array());
  const [initialVelocities, setInitialVelocities] = useState<Float32Array>(new Float32Array());


  useEffect(() => {
    const load = async () => {
      const [positionsRaw, colorsRaw] = await Promise.all([
        fetch("earthPoints.json").then((result) => result.json()),
        fetch("earthColors.json").then((result) => result.json()),
      ]);
      const positions = new Float32Array(positionsRaw);
      const colors = new Float32Array(colorsRaw);

      setNumParticles(positions.length / 3);
      setInitialPositions(new Float32Array(positions));
      setInitialVelocities(new Float32Array(positions.length));
    };

    load();
  }, []);


  return (
    <Canvas gl={{ antialias: true }}>
      {!!numParticles && <Particles numParticles={numParticles} initialPositions={initialPositions} initialVelocities={initialVelocities} />}
    </Canvas>
  );
};
