#version 300 es
precision highp float;

in vec3 position;
in vec3 velocity;
in vec3 displacedPosition;

uniform float time;

out vec3 newPosition; // For Transform Feedback
out vec3 newDisplacedPosition; // For Transform Feedback

void main() {
    float angle = time;
    mat3 rotationMatrix = mat3(
        cos(angle), 0.0, sin(angle),
        0.0, 1.0, 0.0,
        -sin(angle), 0.0, cos(angle)
    );

    vec3 rotatedPosition = rotationMatrix * position;
    newPosition = rotatedPosition + velocity; // Example of applying velocity
    newDisplacedPosition = displacedPosition + velocity; // Example of applying velocity

    gl_Position = vec4(rotatedPosition, 1.0);
    gl_PointSize = 2.0;
}
