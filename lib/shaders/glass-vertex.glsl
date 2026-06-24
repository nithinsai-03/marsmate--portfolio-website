uniform float time;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  
  // Subtle floating displacement
  float displacement = sin(position.x * 2.0 + time * 0.3) * 0.02;
  displacement += cos(position.y * 1.5 + time * 0.2) * 0.01;
  displacement += sin(position.z * 2.5 + time * 0.4) * 0.015;
  
  vDisplacement = displacement;
  
  vec3 displacePos = position + normal * displacement;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacePos, 1.0);
}
