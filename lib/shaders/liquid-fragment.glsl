uniform float time;
varying vec2 vUv;
varying float vNoise;

void main() {
  // Create gradient based on position and noise
  vec3 color = vec3(0.0);
  
  // Flame to Cyan to Magenta gradient
  float t = vNoise + sin(vUv.y * 3.0 + time * 0.3) * 0.5;
  
  // Flame (red-orange) at bottom
  vec3 flame = vec3(1.0, 0.4, 0.0);
  
  // Cyan in middle
  vec3 cyan = vec3(0.0, 0.8, 1.0);
  
  // Magenta at top
  vec3 magenta = vec3(1.0, 0.0, 1.0);
  
  // Mix based on vertical position and noise
  if (t < 0.33) {
    color = mix(flame, cyan, t * 3.0);
  } else if (t < 0.66) {
    color = mix(cyan, magenta, (t - 0.33) * 3.0);
  } else {
    color = mix(magenta, flame, (t - 0.66) * 3.0);
  }
  
  // Add some transparency and glow
  float alpha = 0.6 + sin(vUv.x * 5.0 + time * 0.2) * 0.2;
  
  gl_FragColor = vec4(color, alpha);
}
