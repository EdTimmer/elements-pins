precision mediump float;

uniform float uTime;
uniform int uNoiseSwirlSteps;
uniform float uNoiseSwirlValue;

uniform float uNoiseScale; // 2.0
uniform float uNoiseTimeScale;
uniform float uOpacity;

varying vec2 vUv;
varying vec2 vUv0;

// uniform vec2 iResolution;
// uniform float uTime;

// float noiseSwirlStepValue = uNoiseSwirlValue / float(uNoiseSwirlSteps);



// Simplex noise helper functions

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float simplex(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g, l.zxy);
  vec3 i2 = max(g, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  float n_ = 0.142857142857; // 1.0/7.0
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalize gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
                                 dot(p2, x2), dot(p3, x3)));
}

float fbm3(vec3 v) {
    float result = simplex(v);
    result += simplex(v * 2.0) / 2.0;
    result += simplex(v * 4.0) / 4.0;
    result /= (1.0 + 1.0/2.0 + 1.0/4.0);
    return result;
}

float fbm5(vec3 v) {
    float result = simplex(v);
    result += simplex(v * 2.0) / 2.0;
    result += simplex(v * 4.0) / 4.0;
    result += simplex(v * 8.0) / 8.0;
    result += simplex(v * 16.0) / 16.0;
    result /= (1.0 + 1.0/2.0 + 1.0/4.0 + 1.0/8.0 + 1.0/16.0);
    return result;
}

float getNoise(vec3 v) {
  // Compute the swirl step value at runtime.
    float noiseSwirlStepValue = uNoiseSwirlValue / float(uNoiseSwirlSteps);

    // Add swirl/curl to the noise
    for (int i = 0; i < uNoiseSwirlSteps; i++) {
        v.xy += vec2(fbm3(v), fbm3(vec3(v.xy, v.z + 1000.0))) * noiseSwirlStepValue;
    }
    // Normalize to [0, 1]
    return fbm5(v) / 2.0 + 0.5;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
//   vec2 uv = fragCoord / iResolution.xy;
//   vec2 vUv = fragCoord

  // Use uTime instead of iTime for the time-based component
  float noise = getNoise(vec3(vUv * uNoiseScale, uTime * uNoiseTimeScale));
  // Enhance contrast (noise raised to the fourth power, then scaled)
  noise = pow(noise, 4.0) * 2.0;
  
  // Remove multiplications to make noise white
  gl_FragColor = vec4(noise * 0.7, noise * 0.85, noise, uOpacity);
}
