#version 300 es

// precision highp float;

// varying vec3 vColor; // Color passed from the vertex shader

// vec3 linearToSrgb(vec3 color) {
//     return pow(color, vec3(1.0 / 2.2));
// }

// void main() {
//     // In the Fragment Shader
//     float depth = gl_FragCoord.z / gl_FragCoord.w;
//     if (depth > 4.5) {
//         discard; // This discards the fragment, effectively making it invisible
//     }

//     gl_FragColor = vec4(linearToSrgb(vColor), 1.0);
// }

precision highp float;
out vec4 fragColor;

void main() {
    fragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color
}
