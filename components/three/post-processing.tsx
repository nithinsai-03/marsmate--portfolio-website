'use client';

import { Suspense } from 'react';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function PostProcessingEffects() {
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        {/* Bloom effect for glowing elements */}
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.SCREEN}
        />

        {/* Depth of Field for cinematic feel */}
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.02}
          bokehScale={6}
          height={480}
        />
      </EffectComposer>
    </Suspense>
  );
}
