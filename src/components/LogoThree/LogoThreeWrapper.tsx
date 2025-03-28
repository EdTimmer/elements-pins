import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';

import LogoThreeGroup from './LogoThreeGroup';

interface Props {
  guiy: string;
}

const LogoThreeWrapper = ({guiy}: Props) => {
  const [isFacingUser, setIsFacingUser] = useState(true);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
  }

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={0.5} />
        <LogoThreeGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} />
        {/* <directionalLight position={[0, 5, 5]} />
        <directionalLight position={[-5, -5, 5]} />
        <directionalLight position={[5, -5, 5]} /> */}
        <directionalLight position={[0, 3, 5]} />
        <directionalLight position={[-5, 0, 5]} />
        <directionalLight position={[5, -5, 5]} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoThreeWrapper;