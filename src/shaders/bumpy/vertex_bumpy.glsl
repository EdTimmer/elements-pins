// precision mediump float;

// varying vec2 vUv;
// varying vec2 vUv0;

// void main() {    
//     vUv = uv;
//     vUv0 = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);    
// }

precision mediump float;

// Add uniform for time animation
uniform float uTime;

varying vec2 vUv;
varying vec2 vUv0;
varying float vElevation; // To pass wave height to fragment shader if needed

void main() {    
    vUv = uv;
    vUv0 = uv;
    
    // Calculate distance from center (0.5, 0.5)
    vec2 center = vec2(0.5, 0.5);
    float distance = length(uv - center);
    
    // Create circular wave pattern
    float amplitude = 1.1;
    float frequency = 15.0;
    float speed = 20.0;
    float waveOffset = uTime * speed;
    
    // Sin wave that travels outward from center
    float elevation = amplitude * sin(distance * frequency - waveOffset);
    vElevation = elevation;
    
    // Apply displacement only along z-axis
    vec3 newPosition = position;
    newPosition.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);    
}