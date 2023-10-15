import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer , Bloom , ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { CubeCamera , Environment , OrbitControls , PerspectiveCamera } from "@react-three/drei";
import "./style.css";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import { Rings } from "./Rings";

function CarShow() {
  return (
    <>
      <OrbitControls 
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
      />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[1, 1, 1]}
        intensity={100} 
        position={[0, 10, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <FloatingGrid />
      <Boxes />
      <Rings />

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.7}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} 
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;