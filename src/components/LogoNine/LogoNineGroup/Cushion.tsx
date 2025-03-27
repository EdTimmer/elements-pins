import { useRef } from 'react';
import * as THREE from 'three';
import sphereFragmentShader from '../../../shaders/bumpy/fragment_bumpy.glsl?raw'
import sphereVertexShader from '../../../shaders/bumpy/vertex_bumpy.glsl?raw'
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

interface SphereMaterialBumpyType extends THREE.ShaderMaterial {
  uTime: number;
  uResolution: THREE.Vector2;
  uNoise: number;
  uSpeed: number;
  uOscillationFrequency: number;
  ref: React.MutableRefObject<THREE.ShaderMaterial>;
}

const SphereAnimatedMaterialBumpy = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(100.0, 100.0),
    uNoise: 1.0,
    uSpeed: 0.075,
    uOscillationFrequency: 11.0,
  },
  sphereVertexShader,
  sphereFragmentShader
);

extend({ SphereMaterialBumpy: SphereAnimatedMaterialBumpy });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterialBumpy: ReactThreeFiber.MaterialNode<
      SphereMaterialBumpyType,
        {
          uTime: number;
          uResolution: THREE.Vector2;
          uNoise: number;
          uSpeed: number;
          uOscillationFrequency: number;
        }
      >;
    }
  }
}

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    noise: number;
    speed: number;
    oscillationFrequency: number;
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<SphereMaterialBumpyType>(null!)

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  })

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <sphereMaterialBumpy
        ref={materialRef}
        attach="material"
        uNoise={cushionMaterialProps.noise}
        uSpeed={cushionMaterialProps.speed}
        uOscillationFrequency={cushionMaterialProps.oscillationFrequency}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(100.0, 100.0) }
        }}
      />
    </mesh>
  );
};

export default Cushion;