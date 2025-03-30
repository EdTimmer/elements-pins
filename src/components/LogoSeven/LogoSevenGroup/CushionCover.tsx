import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionCoverMaterialProps: {
    color: string;
    opacity: number;
  },
}

const CushionCover = ({ position, rotation, size, scale, cushionCoverMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial 
          color={cushionCoverMaterialProps.color} 
          transparent 
          opacity={cushionCoverMaterialProps.opacity} 
          side={THREE.BackSide} 
        />
    </mesh>
  );
};

export default CushionCover;