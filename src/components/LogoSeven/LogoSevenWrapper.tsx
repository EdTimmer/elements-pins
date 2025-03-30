import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import LogoSevenGroup from './LogoSevenGroup';

interface Props {
  guiy: string;
  isSmallScreen: boolean;
}

const LogoSevenWrapper = ({guiy, isSmallScreen}: Props) => {
  const [isFacingUser, setIsFacingUser] = useState(true);

  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
  }
  const handleRotate = () => {
    setIsFacingUser(!isFacingUser);
  }

  const bottomLightRef = useRef<THREE.DirectionalLight | null>(null);
  const topLightRefTwo = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (bottomLightRef.current) {
      bottomLightRef.current.lookAt(-2, -0.9, 0);
    }
    if (topLightRefTwo.current) {
      topLightRefTwo.current.lookAt(-2, 0.9, 0);
    }
  }, []);

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleRotate}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <LogoSevenGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} />
        <directionalLight ref={topLightRefTwo} position={[0, 2, 10]} intensity={0.1} />
        <directionalLight ref={bottomLightRef} position={[0, -2, 10]} intensity={0.1} />  
        {!isSmallScreen && <OrbitControls enableDamping enableZoom={false} />}
      </Canvas>
    </div>        
  );
}

export default LogoSevenWrapper;