import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Text from './Text';
import Cushion from './Cushion';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
  guiy: string;
  isClickToggled: boolean;
  isSmallScreen: boolean;
}

function LogoThreeGroup({ isMouseEntered, isFacingUser, setIsFacingUser, isClickToggled, guiy, isSmallScreen }: Props) {
  const logoThreeGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoThreeGroupRef.current) {
      logoThreeGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
    if (logoThreeGroupRef.current) {
      // Apply a "breathing" effect on the X axis.
      logoThreeGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;

      // Determine the starting rotation.
      const initialRotation = isFacingUser ? 0 : Math.PI;
      // Set the target rotation: rotate an extra PI when the mouse enters.
      const targetY = isSmallScreen ? (isClickToggled ? initialRotation - Math.PI : initialRotation) : (isMouseEntered ? initialRotation - Math.PI : initialRotation);

      
      // Incorporate delta into the interpolation factor for frame rate independence.
      const speed = 3; // Adjust this to control the smoothness/speed
      const lerpFactor = 1 - Math.exp(-speed * delta);
      
      // Interpolate the current rotation towards the target rotation.
      logoThreeGroupRef.current.rotation.y = MathUtils.lerp(
        logoThreeGroupRef.current.rotation.y,
        targetY,
        lerpFactor
      );

      // Optionally, snap to target if very close.
      if (Math.abs(logoThreeGroupRef.current.rotation.y - targetY) < 0.001) {
        logoThreeGroupRef.current.rotation.y = targetY;
      }
    }
  });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({});

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
    color: '#fff',
    opacity: 1.0,
    roughness: 0.7,     
    metalness: 0.9,
    emissive: '#fff',
    emissiveIntensity: 0.0,
  });

  useEffect(() => {
    const guiThree = new GUI({
      width: 350,
      title: 'Pd - Palladium',
    });
    // Position the GUI
    guiThree.domElement.style.position = 'absolute';
    guiThree.domElement.style.left = '10px';
    guiThree.domElement.style.top = guiy;

    // GUI media query
    const updateGUIVisibility = () => {
      const shouldShowGUI = window.innerWidth >= 1250;
      guiThree.domElement.style.display = shouldShowGUI ? 'block' : 'none';
    };
    updateGUIVisibility();
      
    // Update visibility when window is resized
    window.addEventListener('resize', updateGUIVisibility);

    // ROTATION FOLDER
    const rotationFolder = guiThree.addFolder('Rotation');
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

    // TEXT FOLDER
    const textFolder = guiThree.addFolder('Text');
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
    const cushionFolder = guiThree.addFolder('Cushion');
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
      guiThree.destroy();
    };

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoThreeGroupRef}>
      <Text text={'46'} position={[-0.7, 0.9, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'Pd'} position={[0.15, -0.1, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.2} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'Palladium'} position={[0, 0.1, -0.3]} rotation={new THREE.Euler(0, Math.PI, 0)} size={0.55} depth={0.5} textMaterialProps={textMaterialProps} />
      <Text text={'106.42'} position={[0, -0.7, -0.3]} rotation={new THREE.Euler(0, Math.PI, 0)} size={0.4} depth={0.5} textMaterialProps={textMaterialProps} />
      <Cushion size={1.1} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoThreeGroup;
