import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EquirectangularReflectionMapping } from 'three';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const loadEnvironmentMap = () => {
  const loader = new RGBELoader();
  return new Promise((resolve, reject) => {
    loader.load(
      '/sky.hdr',
      (texture) => {
        texture.mapping = EquirectangularReflectionMapping;
        resolve(texture);
      },
      undefined,
      (err) => {
        reject(err);
      }
    );
  });
};

const MyEnvironment = () => {
  const { scene } = useThree();
  const environmentMapRef = useRef();

  useEffect(() => {
    const loadMap = async () => {
      try {
        const environmentMap = await loadEnvironmentMap();
        environmentMapRef.current = environmentMap;
        scene.environment = environmentMap;
      } catch (error) {
        console.error('Error loading environment map:', error);
      }
    };

    loadMap();
  }, [scene]);

  return null;
};

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.2} />
      <MyEnvironment />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
