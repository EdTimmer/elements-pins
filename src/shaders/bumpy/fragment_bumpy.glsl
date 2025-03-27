precision mediump float;

uniform float uTime;
uniform int uNoiseSwirlSteps;
uniform float uNoiseSwirlValue;

uniform float uNoiseScale; // 2.0
uniform float uNoiseTimeScale;
uniform float uOpacity;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec2 vUv0;

// #ifdef GL_ES
// precision mediump float;
// #endif

// uniform float uTime;
// uniform vec2 iResolution;

#define ZMAX 50.0
#define EP 0.01
#define ITER 50

// Rotate a 2D vector by angle "ang"
void rotate(inout vec2 p, float ang) {
    float c = cos(ang), s = sin(ang);
    p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

// Signed distance function with animated bumps
float map(vec3 m) {
    rotate(m.xy, uTime / 8.0);
    rotate(m.yz, uTime / 8.0);
    rotate(m.xz, uTime / 8.0);
    
    float d = sin(uTime) / 10.0 + 0.9;
    float bumps = sin(d * m.x) * sin(d * m.y) * sin(d * m.z);
    
    return length(m) - 30.0 + bumps;   
}

// Compute normal via numerical gradient
vec3 getNormal(vec3 v) {
    vec3 e = vec3(EP, 0.0, 0.0);
    return normalize(vec3(
        map(v + e.xyy) - map(v - e.xyy),
        map(v + e.yxy) - map(v - e.yxy),
        map(v + e.yyx) - map(v - e.yyx)
    ));
}

// Raymarching routine
float march(vec3 o, vec3 r, out vec3 m) {
    float t = 0.0;
    for (int i = 0; i < ITER; i++) {
        m = o + r * t;
        float d = map(m);
        if (d < EP) {
            break;
        } else {
            t += d;
            if (t >= ZMAX) { break; }
        }
    }
    return t;
}

// Lighting and color function
vec3 colorize(vec3 m, vec3 normal, vec3 r, vec3 lightPos) {
    vec3 lightRay = normalize(m - lightPos);
    float diffuse = max(0.0, dot(normal, -lightRay));
    vec3 reflectionDirection = reflect(lightRay, normal);
    float spectral = pow(max(dot(reflectionDirection, -r), 0.0), 20.0);
    
    vec3 diff = vec3(1.0, 0.0, 0.0) * diffuse;
    vec3 spec = vec3(1.0, 1.0, 1.0) * spectral;
    vec3 ambi = vec3(0.2, 0.0, 0.0);
    
    return ambi + spec + diff;
}

// Compute ray direction from screen coordinates
vec3 getRayDir(vec2 screenPos, vec3 origin, vec3 lookAt, vec3 up, float fov) {
    vec3 d = normalize(lookAt - origin);
    vec3 rayRight = normalize(cross(d, up));
    return normalize(screenPos.x * rayRight + screenPos.y * up + (1.0 / tan(radians(fov / 2.0))) * d);
}

// Shadertoy-like main function adapted for GLSL in three.js
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 cameraPos = vec3(0.0, 0.0, 43.0);
    vec3 cameraUp = vec3(0.0, 1.0, 0.0);
    vec3 cameraLookAt = vec3(0.0, 0.0, -50.0);
    
    // Convert pixel coordinate to normalized coordinate
    vec2 origin = (2.0 * fragCoord - uResolution.xy) / uResolution.y;
    vec3 lightPos = vec3(0.0, 8.0, 200.0);
    vec3 ray = getRayDir(origin, cameraPos, cameraLookAt, cameraUp, 90.0);
    
    vec3 m;
    float t = march(cameraPos, ray, m);
    
    if (t < ZMAX) {
        float f = 1.0 / (1.0 + t * t * 0.004);
        fragColor = vec4(colorize(m, getNormal(m), ray, lightPos) * f, 1.0);
    } else {
        fragColor = vec4(0.2, 0.2, 0.2, 1.0);
    }
}

void main() {
    // mainImage(gl_FragColor, gl_FragCoord.xy);
     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

     #include <colorspace_fragment> 
}
