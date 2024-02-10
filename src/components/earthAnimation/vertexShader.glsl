// Vertex Shader
precision highp float;

// Uniforms
uniform float time;            // A uniform to control rotation, could be time or a direct angle

// Varying
varying vec3 vColor; // To pass the color to the fragment shader

void main() {
    vColor = color; // Pass color to fragment shader

    // Rotation around Y-axis
    float angle = time; // Use time as the angle for continuous rotation
    mat4 rotationMatrix = mat4(cos(angle), 0.0, sin(angle), 0.0,
                               0.0, 1.0, 0.0, 0.0,
                               -sin(angle), 0.0, cos(angle), 0.0,
                               0.0, 0.0, 0.0, 1.0);
    
    // Apply rotation
    vec4 rotatedPosition = rotationMatrix * vec4(position, 1.0);

    vec4 finalPosition = projectionMatrix * modelViewMatrix * rotatedPosition;

    // Final position
    gl_Position = finalPosition;
    gl_PointSize = 1.0;
    
}
