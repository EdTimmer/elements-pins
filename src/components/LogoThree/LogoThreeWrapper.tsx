import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';

import LogoThreeGroup from './LogoThreeGroup';

interface Props {
  guiy: string;
  isSmallScreen: boolean;
}

const LogoThreeWrapper = ({guiy, isSmallScreen}: Props) => {
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

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleRotate}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={0.5} />
        <LogoThreeGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} />
        <directionalLight position={[0, 3, 5]} intensity={0.5} />
        <directionalLight position={[-5, 0, 5]} intensity={0.5} />
        <directionalLight position={[5, -5, 5]} intensity={0.5} />
        {!isSmallScreen && <OrbitControls enableDamping enableZoom={false} />}
      </Canvas>
    </div>        
  );
}

export default LogoThreeWrapper;