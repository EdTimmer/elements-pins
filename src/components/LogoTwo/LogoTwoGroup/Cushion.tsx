import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    envMapIntensity: number;
    emissive: string;
    emissiveIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  },
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  const { texture, normalMap, roughnessMap } = useMemo(() => {
    const texture = useLoader(TextureLoader, '/textures/rust/rust_coarse_01_diff_2k.png');
    const normalMap = useLoader(TextureLoader, '/textures/rust/rust_coarse_01_nor_gl_2k.png');
    const roughnessMap = useLoader(TextureLoader, '/textures/rust/rust_coarse_01_rough_2k.png');
    
    if (texture && normalMap && roughnessMap) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.LinearFilter;
    }
    
    return { texture, normalMap, roughnessMap };
  }, []);

  // Check if the assets are loaded; otherwise, return null
  if (!texture || !normalMap || !roughnessMap) {
    return null;
  }

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        // envMap={envMap}
        map={texture}
        normalMap={normalMap}
        roughnessMap={roughnessMap} 
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        envMapIntensity={cushionMaterialProps.envMapIntensity}
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default Cushion;