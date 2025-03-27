import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Text from './Text';
import Cushion from './Cushion';
import { Sparkles } from '@react-three/drei';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
  guiy: string;
}

function LogoEightGroup({ isMouseEntered, isFacingUser, setIsFacingUser, guiy }: Props) {
  const logoEightGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoEightGroupRef.current) {
      logoEightGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
    if (logoEightGroupRef.current) {
      // Apply a "breathing" effect on the X axis.
      logoEightGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;

      // Determine the starting rotation.
      const initialRotation = isFacingUser ? 0 : Math.PI;
      // Set the target rotation: rotate an extra PI when the mouse enters.
      const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
      
      // Incorporate delta into the interpolation factor for frame rate independence.
      const speed = 3; // Adjust this to control the smoothness/speed
      const lerpFactor = 1 - Math.exp(-speed * delta);
      
      // Interpolate the current rotation towards the target rotation.
      logoEightGroupRef.current.rotation.y = MathUtils.lerp(
        logoEightGroupRef.current.rotation.y,
        targetY,
        lerpFactor
      );

      // Optionally, snap to target if very close.
      if (Math.abs(logoEightGroupRef.current.rotation.y - targetY) < 0.001) {
        logoEightGroupRef.current.rotation.y = targetY;
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
    color: '#fff',
    opacity: 1.0,
    roughness: 0.2,       
    metalness: 0.2,
    emissive: '#fff',
    emissiveIntensity: 0.2,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#5c5c5c',
    opacity: 1.0,
    roughness: 0.5,     
    metalness: 0.8,
    emissive: '#fff',
    emissiveIntensity: 0,
  });

  useEffect(() => {
    const guiEight = new GUI({
      width: 350,
      title: 'RIGHT - THIRD FROM THE TOP'
    });
    // Position the GUI
    guiEight.domElement.style.position = 'absolute';
    guiEight.domElement.style.right = '10px';
    guiEight.domElement.style.top = guiy;

    // ROTATION FOLDER
    const rotationFolder = guiEight.addFolder('Rotation');
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
    const sparklesFolder = guiEight.addFolder('Sparkles');
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
    const textFolder = guiEight.addFolder('Text');
    textFolderRef.current = textFolder;
    // textFolderRef.current.open();

    const localTextProps = {
      color: textMaterialProps.color,
      opacity: textMaterialProps.opacity,
      roughness: textMaterialProps.roughness,
      metalness: textMaterialProps.metalness,
      emissive: textMaterialProps.emissive,
      emissiveIntensity: textMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, color: value }));
      });

    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    textControllersRef.current.emissiveController = textFolder
      .addColor(localTextProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    textControllersRef.current.emissiveIntensityController = textFolder
      .add(localTextProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });

    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, opacity: value }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiEight.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;
    // cushionFolderRef.current.open();

    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
      emissive: cushionMaterialProps.emissive,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setCushionMaterialProps(prev => ({ ...prev, color: value }));
      });

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, roughness: value }));
      });
      
    cushionControllersRef.current.emissiveController = cushionFolder
      .addColor(localCushionProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setCushionMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    cushionControllersRef.current.emissiveIntensityController = cushionFolder
      .add(localCushionProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, opacity: value }));
      });
    
    return () => {
      guiEight.destroy();
    };

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoEightGroupRef}>
      <Text text={'111'} position={[-0.7, 0.9, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'Rg'} position={[0, -0.25, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.2} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'Roentgenium'} position={[0, 0, -0.3]} rotation={new THREE.Euler(0, Math.PI, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />
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

export default LogoEightGroup;
