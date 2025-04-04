import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  size: number;
  depth: number;
  textMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    reflectivity: number;
    clearcoat: number;
    clearcoatRoughness: number;
    opacity: number;
  }
}

const Text = ({ position, rotation, text, size, depth, textMaterialProps }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [font, setFont] = useState<Font | null>(null);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/open_sans_light_regular.typeface.json', (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

  const textGeometry = useMemo(() => {
    if (!font) return null;

    const textOptions = {
      font,
      size: size,
      depth: depth,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0.0,
      bevelSegments: 5,
    };

    const geometry = new TextGeometry(text, textOptions);

    geometry.computeBoundingBox();
    geometry.center();

    return geometry;
  }, [font]);

  if (!font || !textGeometry) return null;

  return (
    <mesh ref={meshRef} geometry={textGeometry} rotation={rotation} position={position} renderOrder={2}>
      <meshPhysicalMaterial
        color={textMaterialProps.color}
        metalness={textMaterialProps.metalness}
        roughness={textMaterialProps.roughness}
        reflectivity={textMaterialProps.reflectivity}  // Reflectivity of the material
        clearcoat={textMaterialProps.clearcoat}     // Adds a clear coat layer
        clearcoatRoughness={textMaterialProps.clearcoatRoughness}  // Polished surface
        opacity={textMaterialProps.opacity}
        transparent
      />
    </mesh>
  );
};

export default Text;
