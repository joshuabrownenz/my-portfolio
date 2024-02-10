import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import vertexShader from "./vertexShader.glsl"; // Your vertex shader code
import fragmentShader from "./fragmentShader.glsl"; // Your fragment shader code here


type ParticlesProps = {
  numParticles: number;
  initialPositions: Float32Array;
  initialVelocities: Float32Array;
};

// Function to create a shader
function createShader(webgl2: WebGL2RenderingContext, type: number, source: string) {
  let shader = webgl2.createShader(type);
  if (!shader) {
    console.error('Failed to create shader');
    return null;
  }

  webgl2.shaderSource(shader, source);
  webgl2.compileShader(shader);
  if (!webgl2.getShaderParameter(shader, webgl2.COMPILE_STATUS)) {
    console.error('Shader compile failed with: ' + webgl2.getShaderInfoLog(shader));
    webgl2.deleteShader(shader);
    return null;
  }
  return shader;
}

// Function to create a shader program
function createShaderProgram(webgl2: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
  let vertexShader = createShader(webgl2, webgl2.VERTEX_SHADER, vertexSource);
  let fragmentShader = createShader(webgl2, webgl2.FRAGMENT_SHADER, fragmentSource);
  let shaderProgram = webgl2.createProgram();
  if (!shaderProgram || !vertexShader || !fragmentShader) {
    console.error('Failed to create shader program');
    return null;
  }

  webgl2.attachShader(shaderProgram, vertexShader);
  webgl2.attachShader(shaderProgram, fragmentShader);

  // Specify the varyings to capture with Transform Feedback
  webgl2.transformFeedbackVaryings(shaderProgram, ["gl_Position"], webgl2.SEPARATE_ATTRIBS);

  webgl2.linkProgram(shaderProgram);
  if (!webgl2.getProgramParameter(shaderProgram, webgl2.LINK_STATUS)) {
    console.error('Program linking failed with: ' + webgl2.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}

const Particles = ({
  numParticles,
  initialPositions,
  initialVelocities,
}: ParticlesProps) => {
  const { gl } = useThree();
  const transformFeedback = useRef<WebGLTransformFeedback | null>(null);
  const displacedTransformFeedback = useRef<WebGLTransformFeedback | null>(null);
  
  const positionBuffer = useRef<WebGLBuffer | null>(null);
  const displacedPositionBuffer = useRef<WebGLBuffer | null>(null);
  const velocityBuffer = useRef<WebGLBuffer | null>(null);

  const shaderProgram = useMemo(() => createShaderProgram(gl.getContext() as WebGL2RenderingContext, vertexShader, fragmentShader), [])

  useEffect(() => {
    const webgl2 = gl.getContext() as WebGL2RenderingContext;

    // Initialize buffers and transform feedback
    positionBuffer.current = webgl2.createBuffer();
    displacedPositionBuffer.current = webgl2.createBuffer();
    velocityBuffer.current = webgl2.createBuffer();

    // Bind buffers
    webgl2.bindBuffer(webgl2.ARRAY_BUFFER, positionBuffer.current);
    webgl2.bufferData(webgl2.ARRAY_BUFFER, initialPositions, webgl2.DYNAMIC_COPY);

    webgl2.bindBuffer(webgl2.ARRAY_BUFFER, displacedPositionBuffer.current);
    webgl2.bufferData(webgl2.ARRAY_BUFFER, initialPositions, webgl2.DYNAMIC_COPY);

    webgl2.bindBuffer(webgl2.ARRAY_BUFFER, velocityBuffer.current);
    webgl2.bufferData(webgl2.ARRAY_BUFFER, initialVelocities, webgl2.DYNAMIC_COPY);


    transformFeedback.current = webgl2.createTransformFeedback();
    webgl2.bindTransformFeedback(webgl2.TRANSFORM_FEEDBACK, transformFeedback.current);
    webgl2.bindBufferBase(webgl2.TRANSFORM_FEEDBACK_BUFFER, 0, positionBuffer.current);

    displacedTransformFeedback.current = webgl2.createTransformFeedback();
    webgl2.bindTransformFeedback(webgl2.TRANSFORM_FEEDBACK, displacedTransformFeedback.current);
    webgl2.bindBufferBase(webgl2.TRANSFORM_FEEDBACK_BUFFER, 0, displacedPositionBuffer.current);

    return () => {
      // Cleanup
      webgl2.deleteBuffer(positionBuffer.current);
      webgl2.deleteBuffer(velocityBuffer.current);
      webgl2.deleteTransformFeedback(transformFeedback.current);
      webgl2.deleteTransformFeedback(displacedTransformFeedback.current);
    };
  }, [gl, numParticles, initialPositions, initialVelocities]);

  useFrame(() => {
    const webgl2 = gl.getContext() as WebGL2RenderingContext;

    if (!shaderProgram) {
      console.error('Shader program not initialized');
      return;
    }

    webgl2.useProgram(shaderProgram);

    // Set up attribute pointers here, for example:
    const positionAttribLocation = webgl2.getAttribLocation(shaderProgram, 'position');
    const displacedPositionAtrribLocation = webgl2.getAttribLocation(shaderProgram, 'displacedPosition');
    const velocityAtrribLocation = webgl2.getAttribLocation(shaderProgram, 'velocity');
    if (!shaderProgram || positionAttribLocation === -1 || displacedPositionAtrribLocation === -1 || velocityAtrribLocation === -1) {
      console.log(shaderProgram, positionAttribLocation, displacedPositionAtrribLocation, velocityAtrribLocation)
      console.error('Attribute location not found');
      return;
    }
    
    // For position
  webgl2.bindBuffer(webgl2.ARRAY_BUFFER, positionBuffer.current);
  webgl2.vertexAttribPointer(positionAttribLocation, 3, webgl2.FLOAT, false, 0, 0);
  webgl2.enableVertexAttribArray(positionAttribLocation);

  // For displacedPosition
  webgl2.bindBuffer(webgl2.ARRAY_BUFFER, displacedPositionBuffer.current);
  webgl2.vertexAttribPointer(displacedPositionAtrribLocation, 3, webgl2.FLOAT, false, 0, 0);
  webgl2.enableVertexAttribArray(displacedPositionAtrribLocation);

  // For velocity
  webgl2.bindBuffer(webgl2.ARRAY_BUFFER, velocityBuffer.current);
  webgl2.vertexAttribPointer(velocityAtrribLocation, 3, webgl2.FLOAT, false, 0, 0);
  webgl2.enableVertexAttribArray(velocityAtrribLocation);

  // **Important**: Unbind the ARRAY_BUFFER to avoid the GL_INVALID_OPERATION error
  webgl2.bindBuffer(webgl2.ARRAY_BUFFER, null);

  // Prepare for transform feedback
  webgl2.enable(webgl2.RASTERIZER_DISCARD);
  webgl2.bindTransformFeedback(webgl2.TRANSFORM_FEEDBACK, transformFeedback.current);
  webgl2.bindTransformFeedback(webgl2.TRANSFORM_FEEDBACK, displacedTransformFeedback.current);
  webgl2.beginTransformFeedback(webgl2.POINTS);

  // Perform the draw call
  webgl2.drawArrays(webgl2.POINTS, 0, numParticles);

  // End transform feedback and restore state
  webgl2.endTransformFeedback();
  webgl2.bindTransformFeedback(webgl2.TRANSFORM_FEEDBACK, null); // Unbind transform feedback object
  webgl2.disable(webgl2.RASTERIZER_DISCARD);

  gl.autoClear = true; // Restore R3F autoClear state
});


  return null; // This component does not directly render anything visible
};

export { Particles };
