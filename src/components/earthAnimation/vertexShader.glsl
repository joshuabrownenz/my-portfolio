#version 300 es
precision highp float;

in vec4 position;
uniform float time;

out vec4 feedbackPosition;


void main() {
    feedbackPosition = position + vec4(0.0, time * 0.00, 0.0, 0.0);

    gl_Position = feedbackPosition;
    gl_PointSize = 10.0;
}