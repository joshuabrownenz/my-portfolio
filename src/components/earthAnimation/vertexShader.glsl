precision highp float;

// Uniforms
uniform float time; // A uniform to control rotation, could be time or a direct angle
uniform vec2 mousePos; // Mouse position, normalized [-1, 1]
uniform float repulsionRadius; // Radius of effect
uniform float repulsionStrength; // Strength of repulsion

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

    // Convert mousePos from NDC directly to the same space as the rotated vertices
    // Note: This step assumes the mousePos needs to be transformed similarly to how vertices are transformed
    // to be in the correct space for comparison. The exact transformation may vary based on your setup.

    // Compute the repulsion in the rotated space
    // Note: You may need to adjust the space conversion for mousePos based on your camera setup and how you're
    // transforming your vertices.
    vec4 mousePosition = vec4(mousePos, 0.0, 1.0); // Placeholder for a proper conversion, if necessary
    float distanceToMouse = distance(rotatedPosition.xy, mousePosition.xy);
    if (distanceToMouse < repulsionRadius) {
        vec2 dirToMouse = normalize(rotatedPosition.xy - mousePosition.xy);
        // Apply repulsion
        rotatedPosition.xy += dirToMouse * repulsionStrength * (repulsionRadius - distanceToMouse) / repulsionRadius;
    }

    // Project the final position
    vec4 finalPosition = projectionMatrix * modelViewMatrix * rotatedPosition;

    // Final position
    gl_Position = finalPosition;
    gl_PointSize = 1.0;
}
