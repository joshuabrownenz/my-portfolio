import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import vertexShader from "./vertexShader.glsl"; // Your vertex shader code
import fragmentShader from "./fragmentShader.glsl"; // Your fragment shader code here
import React from "react";


type ParticlesProps = {
  numParticles: number;
};

function createShader(webgl2: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader | null {
  const shader = webgl2.createShader(type);
  if (!shader) {
    console.error("Unable to create shader");
    return null;
  }
  webgl2.shaderSource(shader, source);
  webgl2.compileShader(shader);
  if (!webgl2.getShaderParameter(shader, webgl2.COMPILE_STATUS)) {
    console.error("Shader compile failed: ", webgl2.getShaderInfoLog(shader));
    webgl2.deleteShader(shader);
    return null;
  }
  return shader;
}

function createShaderProgram(webgl2: WebGL2RenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram | null {
  const vertexShader = createShader(webgl2, webgl2.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(webgl2, webgl2.FRAGMENT_SHADER, fragmentSource);
  const program = webgl2.createProgram();
  if (!program || !vertexShader || !fragmentShader) {
    console.error("Failed to create shader program");
    return null;
  }
  webgl2.attachShader(program, vertexShader);
  webgl2.attachShader(program, fragmentShader);

  webgl2.transformFeedbackVaryings(program, ["feedbackPosition"], webgl2.SEPARATE_ATTRIBS);

  webgl2.linkProgram(program);
  if (!webgl2.getProgramParameter(program, webgl2.LINK_STATUS)) {
    console.error("Program linking failed: ", webgl2.getProgramInfoLog(program));
    return null;
  }
  return program;
}

const Particles: React.FC<ParticlesProps> = ({ numParticles }) => {
  const { gl } = useThree();

  const transformFeedback = useRef<WebGLTransformFeedback | null>(null);
  const positionBuffers = useRef<(WebGLBuffer | null)[]>([null, null]);
  const shaderProgram = useRef<WebGLProgram | null>(null);
  const currentBufferIndex = useRef(0); // Toggle between 0 and 1

  useEffect(() => {
    const webgl2 = gl.getContext() as WebGL2RenderingContext;
    shaderProgram.current = createShaderProgram(webgl2, vertexShader, fragmentShader);

    // Initialize position buffers
    positionBuffers.current = [webgl2.createBuffer(), webgl2.createBuffer()].map((buffer, index) => {
      const positions = new Float32Array(numParticles * 4); // x, y, z, w
      // Populate `positions` with initial data...
      webgl2.bindBuffer(webgl2.ARRAY_BUFFER, buffer);
      webgl2.bufferData(webgl2.ARRAY_BUFFER, positions, webgl2.DYNAMIC_COPY);
      return buffer;
    });

    // Setup Transform Feedback
    transformFeedback.current = webgl2.createTransformFeedback();

    return () => {
      positionBuffers.current.forEach(buffer => webgl2.deleteBuffer(buffer));
      if (transformFeedback.current) webgl2.deleteTransformFeedback(transformFeedback.current);
    };
  }, [gl, numParticles]);

  useFrame(() => {
    const webgl2 = gl.getContext() as WebGL2RenderingContext;
    if (!shaderProgram.current) return;

    webgl2.useProgram(shaderProgram.current);

    const timeUniformLocation = webgl2.getUniformLocation(shaderProgram.current, "time");
    webgl2.uniform1f(timeUniformLocation, performance.now() / 1000);

    const inputBufferIndex = currentBufferIndex.current;
    const outputBufferIndex = (currentBufferIndex.current + 1) % 2;

    webgl2.bindBuffer(webgl2.ARRAY_BUFFER, positionBuffers.current[inputBufferIndex]);
    const positionAttribLocation = webgl2.getAttribLocation(shaderProgram.current, "position");
    webgl2.vertexAttribPointer(positionAttribLocation, 4, webgl2.FLOAT, false, 0, 0);
    webgl2.enableVertexAttribArray(positionAttribLocation);

    // Setup for Transform Feedback
    webgl2.bindTransformFeedback(webgl2.TRANSFORM_FEEDBACK, transformFeedback.current);
    webgl2.bindBufferBase(webgl2.TRANSFORM_FEEDBACK_BUFFER, 0, positionBuffers.current[outputBufferIndex]);

    webgl2.enable(webgl2.RASTERIZER_DISCARD);
    webgl2.beginTransformFeedback(webgl2.POINTS);
    webgl2.drawArrays(webgl2.POINTS, 0, numParticles);
    webgl2.endTransformFeedback();
    webgl2.disable(webgl2.RASTERIZER_DISCARD);

    // Toggle the buffer index for the next frame
    currentBufferIndex.current = outputBufferIndex;
  });

  return null;
};

export { Particles };
