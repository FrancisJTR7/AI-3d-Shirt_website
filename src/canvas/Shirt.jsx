import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);

  // Load the GLTF model and textures
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal || '/default-logo.jpg'); // Use a fallback if texture path is undefined
  const fullTexture = useTexture(snap.fullDecal || '/default-full.jpg'); // Use a fallback if texture path is undefined

  // Apply texture properties after loading
  useEffect(() => {
    if (logoTexture) logoTexture.anisotropy = 16;
    if (fullTexture) fullTexture.anisotropy = 16;
  }, [logoTexture, fullTexture]);

  // Smooth color transition using easing
  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  // Use JSON.stringify only for stable keys in the group
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* Apply decals conditionally based on texture availability */}
        {snap.isFullTexture && fullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && logoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
