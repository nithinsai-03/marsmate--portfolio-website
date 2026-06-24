uniform float time;
uniform vec2 mouse;
uniform float mouseInfluence;

varying vec2 vUv;
varying vec3 vPosition;
varying float vNoise;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 x12;
  x12.x = x0.x - 0.0 + C.xx;
  x12.y = x0.y - 1.0 + C.xx;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, C.xx)) + i.x + vec3(0.0, x0.x, 0.0));
  vec3 px = permute(p + vec3(0.0, C.x, C.y));
  vec2 grad0 = fract(px * C.ww) * 2.0 - 1.0;
  vec2 grad1 = fract((p + C.y) * C.ww) * 2.0 - 1.0;
  vec2 grad2 = fract((px + C.y) * C.ww) * 2.0 - 1.0;
  vec4 d = vec4(dot(grad0, x0), dot(grad1, x12.xy), dot(grad2, x12.yx), 0.0);
  d.xy += dot(C.zz, x0.x) * vec2(d.w, d.x);
  d.z += dot(C.zz, x12.y) * d.x;
  d.w = dot(C.zz, x12.yx) * d.y;
  d.xzyw = mix(d.xzyw, d.yzwx, 0.5);
  return normalize(d.x + d.y + d.z + d.w) * 1.42;
}

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Create flowing liquid effect
  float n1 = snoise(vec2(uv.x * 3.0, uv.y * 3.0 + time * 0.5));
  float n2 = snoise(vec2(uv.x * 5.0 - time * 0.3, uv.y * 5.0));
  
  // Wave displacement
  pos.y += sin(pos.x * 2.0 + time * 0.5) * 0.1 + n1 * 0.1;
  pos.z += cos(uv.y * 4.0 + time * 0.3) * 0.05 + n2 * 0.05;
  
  // Mouse influence (ripple effect)
  float distToMouse = length(uv - mouse);
  if (distToMouse < 0.3) {
    float ripple = sin((distToMouse - time * 0.5) * 10.0) * (1.0 - distToMouse) * mouseInfluence;
    pos.z += ripple * 0.15;
  }
  
  vPosition = pos;
  vNoise = n1 * 0.5 + n2 * 0.5;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
