import { useEffect, useMemo, useState } from 'react';
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
    opacity: number;
    roughness: number;
    metalness: number;
    emissive: string;
    emissiveIntensity: number;
  }
}

const Text = ({ position, rotation, text, size, depth, textMaterialProps }: Props) => {
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
      bevelOffset: 0,
      bevelSegments: 5,
    };

    const geometry = new TextGeometry(text, textOptions);
  
    // Compute the bounding box of the text and center it
    geometry.computeBoundingBox();
    geometry.center();  // This will center the text at the origin (0, 0, 0)

    return geometry;
  }, [font]);

  if (!font || !textGeometry) return null;

  return (
    <mesh geometry={textGeometry} rotation={rotation} position={position} renderOrder={3}>
      <meshStandardMaterial 
        metalness={textMaterialProps.metalness}
        roughness={textMaterialProps.roughness}
        color={textMaterialProps.color}
        opacity={textMaterialProps.opacity}
        transparent
        emissive={textMaterialProps.emissive}
        emissiveIntensity={textMaterialProps.emissiveIntensity}
      />
    </mesh>
  );
};

export default Text;
