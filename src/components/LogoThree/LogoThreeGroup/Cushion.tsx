import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    opacity: number;
    roughness: number;
    metalness: number;
    emissive: string;
    emissiveIntensity: number;
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  const { texture, normalMap, roughnessMap } = useMemo(() => {
    const texture = useLoader(TextureLoader, '/textures/pebbles/ganges_river_pebbles_diff_a_2k.png');
    const normalMap = useLoader(TextureLoader, '/textures/pebbles/ganges_river_pebbles_nor_gl_2k.png');
    const roughnessMap = useLoader(TextureLoader, '/textures/pebbles/ganges_river_pebbles_rough_2k.png');
    
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
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        // map={texture}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        color={cushionMaterialProps.color}
        opacity={cushionMaterialProps.opacity}
        emissive={cushionMaterialProps.emissive}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default Cushion;