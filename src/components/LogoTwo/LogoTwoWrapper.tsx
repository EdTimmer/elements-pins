import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';
import LogoTwoGroup from './LogoTwoGroup';

interface Props {
  guiy: string;
  isSmallScreen: boolean;
}

const LogoTwoWrapper = ({guiy, isSmallScreen}: Props) => {
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
        <ambientLight intensity={1} />
        <LogoTwoGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} isClickToggled={isClickToggled} isSmallScreen={isSmallScreen} />
        <directionalLight position={[0, -1, 1]} intensity={1} />
        <directionalLight position={[-6, -6, 1]} intensity={1} />
        {!isSmallScreen && <OrbitControls enableDamping enableZoom={false} />}
      </Canvas>
    </div>        
  );
}

export default LogoTwoWrapper;