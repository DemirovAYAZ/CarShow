import React, { useEffect } from 'react';
import { useLoader , useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Color } from 'three';

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/models/car/scene.gltf`
    );

    useEffect(() => {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, 0, 0);

        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;

                if (object.material.envMap) {
                    object.material.envMapIntensity = 20;
                }

                if (object.material.color) {
                    object.material.color = new Color().set(object.material.color);

                    object.material.roughness = 0;
                    object.material.metalness = 0.4;
                    
                }
            }
        });
    }, [gltf]);
    console.log(gltf.scene)
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();
    
        let group = gltf.scene.children[0].children[0].children[0];
        group.children[1].rotation.x = t * 6;
        group.children[2].rotation.x = t * 6;
        group.children[3].rotation.x = t * 6;
        group.children[4].rotation.x = t * 6;
      });

    return <primitive object={gltf.scene} />;
}
