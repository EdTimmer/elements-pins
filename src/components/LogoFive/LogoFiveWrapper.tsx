import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';
import LogoFiveGroup from './LogoFiveGroup';

interface Props {
  guiy: string;
  isSmallScreen: boolean;
}

const LogoFiveWrapper = ({guiy, isSmallScreen}: Props) => {
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
        <LogoFiveGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} isClickToggled={isClickToggled} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, 5]} />
        <directionalLight position={[5, -5, 5]} />
        {!isSmallScreen && <OrbitControls enableDamping enableZoom={false} />}
      </Canvas>
    </div>        
  );
}

export default LogoFiveWrapper;