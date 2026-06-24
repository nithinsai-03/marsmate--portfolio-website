varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vPosition);
  
  // Fresnel effect
  float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
  
  // Glass color with subtle iridescence
  vec3 glassColor = vec3(0.8, 0.9, 1.0);
  glassColor += fresnel * vec3(0.5, 0.3, 0.8) * 0.2;
  
  // Transmission/transparency based on fresnel
  float alpha = 0.7 + fresnel * 0.2;
  
  gl_FragColor = vec4(glassColor, alpha);
}
