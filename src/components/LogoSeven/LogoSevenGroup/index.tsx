import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import Text from './Text';
import CushionCover from './CushionCover';
import { Sparkles } from '@react-three/drei';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
  guiy: string;
}

function LogoSevenGroup({ isMouseEntered, isFacingUser, setIsFacingUser, guiy }: Props) {
  const logoSevenGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoSevenGroupRef.current) {
      logoSevenGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
      if (logoSevenGroupRef.current) {
        // Apply a "breathing" effect on the X axis.
        logoSevenGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;
  
        // Determine the starting rotation.
        const initialRotation = isFacingUser ? 0 : Math.PI;
        // Set the target rotation: rotate an extra PI when the mouse enters.
        const targetY = isMouseEntered ? initialRotation - Math.PI : initialRotation;
        
        // Incorporate delta into the interpolation factor for frame rate independence.
        const speed = 3; // Adjust this to control the smoothness/speed
        const lerpFactor = 1 - Math.exp(-speed * delta);
        
        // Interpolate the current rotation towards the target rotation.
        logoSevenGroupRef.current.rotation.y = MathUtils.lerp(
          logoSevenGroupRef.current.rotation.y,
          targetY,
          lerpFactor
        );
  
        // Optionally, snap to target if very close.
        if (Math.abs(logoSevenGroupRef.current.rotation.y - targetY) < 0.001) {
          logoSevenGroupRef.current.rotation.y = targetY;
        }
      }
    });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({});

  // SPARKLES GUI REFS
  const sparklesFolderRef = useRef<GUI | null>(null);
  const sparklesControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sparklesProps, setSparklesProps] = useState({
    color: '#ffffff',
    count: 20,
    scale: 3,
    size: 10,
    speed: 0.4,
    opacity: 1.0,
    noise: 0.1,
  });

  // TEXT GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#c0c0c0',
    metalness: 1,
    roughness: 0.15,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    opacity: 1.0,
  });

  // CUSHION SHADER GUI REFS
  const cushionRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({});
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    noise: 5.0,
    speed: 0.3,
    oscillationFrequency: 3.2,
  });

  // CUSHION COVERAGE GUI REFS
  const cushionCoverFolderRef = useRef<GUI | null>(null);
  const cushionCoverControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionCoverMaterialProps, setCushionCoverMaterialProps] = useState({
    color: '#e4e3e3',
    opacity: 0.3,
  });

  useEffect(() => {
    const guiSeven = new GUI({
      width: 350,
      title: 'Ds - Darmstadtium',
    });
    // Position the GUI
    guiSeven.domElement.style.position = 'absolute';
    guiSeven.domElement.style.left = '10px';
    guiSeven.domElement.style.top = guiy;

    // GUI media query
    const updateGUIVisibility = () => {
      const shouldShowGUI = window.innerWidth >= 1250; // Adjust breakpoint as needed
      guiSeven.domElement.style.display = shouldShowGUI ? 'block' : 'none';
    };
    updateGUIVisibility();
      
    // Update visibility when window is resized
    window.addEventListener('resize', updateGUIVisibility);

    // ROTATION FOLDER
    const rotationFolder = guiSeven.addFolder('Rotation');
    rotationFolderRef.current = rotationFolder;

    const localRotationProps = {
      isFacingUser,
    }

    // add rotation controls for each property with a step increment of Math.PI
    rotationControllersRef.current.isFacingUserController = rotationFolder
      .add(localRotationProps, 'isFacingUser')
      .name('Is Facing User')
      .onChange((isFacingUser: boolean) => {
        setIsFacingUser(isFacingUser);
      });

          // SPARKLES FOLDER
    const sparklesFolder = guiSeven.addFolder('Sparkles');
    sparklesFolderRef.current = sparklesFolder;
    const localSparklesProps = {
      count: sparklesProps.count,
      scale: sparklesProps.scale,
      size: sparklesProps.size,
      speed: sparklesProps.speed,
      noise: sparklesProps.noise,
      opacity: sparklesProps.opacity,
      color: sparklesProps.color,
    };

    // Add controls for each property
    sparklesControllersRef.current.colorController = sparklesFolder
      .addColor(localSparklesProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setSparklesProps((prev) => ({ ...prev, color: value }));
      });

    sparklesControllersRef.current.countController = sparklesFolder
      .add(localSparklesProps, 'count', 0, 100, 1)
      .name('Count')
      .onChange((value: number) => {
        setSparklesProps((prev) => ({ ...prev, count: value }));
      });

    sparklesControllersRef.current.scaleController = sparklesFolder
      .add(localSparklesProps, 'scale', 0, 10, 0.1)
      .name('Scale')
      .onChange((value: number) => {
        setSparklesProps((prev) => ({ ...prev, scale: value }));
      });

    sparklesControllersRef.current.sizeController = sparklesFolder
      .add(localSparklesProps, 'size', 0, 100, 1)
      .name('Size')
      .onChange((value: number) => {
        setSparklesProps((prev) => ({ ...prev, size: value }));
      });

    sparklesControllersRef.current.speedController = sparklesFolder
      .add(localSparklesProps, 'speed', 0, 1, 0.01)
      .name('Speed')
      .onChange((value: number) => {
        setSparklesProps((prev) => ({ ...prev, speed: value }));
      });

    sparklesControllersRef.current.noiseController = sparklesFolder
      .add(localSparklesProps, 'noise', 0, 1, 0.01)
      .name('Noise')
      .onChange((value: number) => {
        setSparklesProps((prev) => ({ ...prev, noise: value }));
      });

    sparklesControllersRef.current.opacityController = sparklesFolder
      .add(localSparklesProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setSparklesProps((prev) => ({ ...prev, opacity: value }));
      });

    // TEXT FOLDER
    const textFolder = guiSeven.addFolder('Text');
    textFolderRef.current = textFolder;
    // textFolderRef.current.open();

    const localTextProps = {
      color: textMaterialProps.color,
      metalness: textMaterialProps.metalness,
      roughness: textMaterialProps.roughness,
      reflectivity: textMaterialProps.reflectivity,
      clearcoat: textMaterialProps.clearcoat,
      clearcoatRoughness: textMaterialProps.clearcoatRoughness,
      opacity: textMaterialProps.opacity,
    };
    // Add controls for each property
    textControllersRef.current.colorController = textFolder
    .addColor(localTextProps, 'color')
    .name('Color')
    .onChange((value: string) => {
      setTextMaterialProps((prev) => ({ ...prev, color: value }));
    });

    textControllersRef.current.metalnessController = textFolder
    .add(localTextProps, 'metalness', 0, 1, 0.01)
    .name('Metalness')
    .onChange((value: number) => {
      setTextMaterialProps((prev) => ({ ...prev, metalness: value }));
    });

    textControllersRef.current.roughnessController = textFolder
    .add(localTextProps, 'roughness', 0, 1, 0.01)
    .name('Roughness')
    .onChange((value: number) => {
      setTextMaterialProps((prev) => ({ ...prev, roughness: value }));
    });

    textControllersRef.current.reflectivityController = textFolder
    .add(localTextProps, 'reflectivity', 0, 1, 0.01)
    .name('Reflectivity')
    .onChange((value: number) => {
      setTextMaterialProps((prev) => ({ ...prev, reflectivity: value }));
    });

    textControllersRef.current.clearcoatController = textFolder
    .add(localTextProps, 'clearcoat', 0, 1, 0.01)
    .name('Clearcoat')
    .onChange((value: number) => {
      setTextMaterialProps((prev) => ({ ...prev, clearcoat: value }));
    });

    textControllersRef.current.clearcoatRoughnessController = textFolder
    .add(localTextProps, 'clearcoatRoughness', 0, 1, 0.01)
    .name('Clearcoat Roughness')
    .onChange((value: number) => {
      setTextMaterialProps((prev) => ({ ...prev, clearcoatRoughness: value }));
    });

    textControllersRef.current.opacityController = textFolder
    .add(localTextProps, 'opacity', 0, 1, 0.01)
    .name('Opacity')
    .onChange((value: number) => {
      setTextMaterialProps((prev) => ({ ...prev, opacity: value }));
    });

    // CUSHION FOLDER
    const cushionFolder = guiSeven.addFolder('Cushion');
    cushionRef.current = cushionFolder;
    // cushionRef.current.open();

    const localCushionProps = {
      noise: cushionMaterialProps.noise,
      speed: cushionMaterialProps.speed,
      oscillationFrequency: cushionMaterialProps.oscillationFrequency,
    }

    // add controls for each property
    cushionControllersRef.current.noiseController = cushionFolder
      .add(localCushionProps, 'noise', 0, 5, 0.01)
      .name('Noise')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, noise: value }));
      });

    cushionControllersRef.current.speedController = cushionFolder
      .add(localCushionProps, 'speed', 0, 2, 0.001)
      .name('Speed')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, speed: value }));
      });

    cushionControllersRef.current.oscillationFrequencyController = cushionFolder
      .add(localCushionProps, 'oscillationFrequency', 0, 20, 0.1)
      .name('Oscillation Frequency')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, oscillationFrequency: value }));
      });
    
    // CUSHION COVER FOLDER
    const cushionCoverFolder = guiSeven.addFolder('Cushion Cover');
    cushionCoverFolderRef.current = cushionCoverFolder;

    const localCushionCoverProps = {
      color: cushionCoverMaterialProps.color,
      opacity: cushionCoverMaterialProps.opacity,
    }

    // add controls for each property
    cushionCoverControllersRef.current.colorController = cushionCoverFolder
      .addColor(localCushionCoverProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionCoverMaterialProps((prev) => ({ ...prev, color }));
      });

    cushionCoverControllersRef.current.opacityController = cushionCoverFolder
      .add(localCushionCoverProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionCoverMaterialProps((prev) => ({ ...prev, opacity }));
      });
    
    return () => {
      guiSeven.destroy();
    }
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoSevenGroupRef}>
      <Text text={'110'} position={[-0.7, 0.9, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'Ds'} position={[0.1, -0.1, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.2} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'Darmstadtium'} position={[0, 0, -0.3]} rotation={new THREE.Euler(0, Math.PI, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'281'} position={[0, -0.7, -0.3]} rotation={new THREE.Euler(0, Math.PI, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />

      <CushionCover size={1.12} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={1.1} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />

      <Sparkles
        key={sparklesProps.count}
        color={sparklesProps.color}
        count={sparklesProps.count}
        scale={sparklesProps.scale}
        size={sparklesProps.size}
        speed={sparklesProps.speed}
        opacity={sparklesProps.opacity}
        noise={sparklesProps.noise}
      />
    </group>    
  );
}

export default LogoSevenGroup;
