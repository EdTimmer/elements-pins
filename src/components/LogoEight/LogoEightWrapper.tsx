import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import LogoEightGroup from './LogoEightGroup';

interface Props {
  guiy: string;
  isSmallScreen: boolean;
}

const LogoEightWrapper = ({guiy, isSmallScreen}: Props) => {
  const [isFacingUser, setIsFacingUser] = useState(true);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isClickToggled, setIsClickToggled] = useState(false);

  const handleMouseEnter = () => {
    if (isSmallScreen) return;
    setIsMouseEntered(true);
  }
  const handleMouseLeave = () => {
    if (isSmallScreen) return;
    setIsMouseEntered(false);
  }
  const handleRotate = () => {
    setIsClickToggled(!isClickToggled);
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
        <LogoEightGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} isClickToggled={isClickToggled} isSmallScreen={isSmallScreen} />
        <directionalLight ref={topLightRefTwo} position={[0, 2, 10]} intensity={0.1} />
        <directionalLight ref={bottomLightRef} position={[0, -2, 10]} intensity={0.1} />  
        <directionalLight position={[2, 3, 3]} intensity={1} />
        <directionalLight position={[-2, -3, 3]} intensity={1} />
        <directionalLight position={[-2, 3, 3]} intensity={1} />
        <directionalLight position={[2, -3, 3]} intensity={1} />
        {!isSmallScreen && <OrbitControls enableDamping enableZoom={false} />}
      </Canvas>
    </div>        
  );
}

export default LogoEightWrapper;