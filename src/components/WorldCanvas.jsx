import { Canvas } from "@react-three/fiber";
import { BuildingContainer } from "./BuildingContainer";
import { SurroundingContext } from "./SurroundingContext";
import { Plane, OrbitControls } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import { BuildingContext } from "../context/BuildingContext";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const WorldCanvas = () => {
  const { building } = useContext(BuildingContext);
  const { sunPos } = useContext(SocketContext);
  const dLightPos = sunPos.map((x) => x * 100);
  return (
    <Canvas
      className="canvas"
      colorManagement
      shadows
      camera={{ fov: 60, position: [-100, 50, -60] }}
    >
      <OrbitControls maxPolarAngle={Math.PI / 2} target={[0, 0, 0]} />
      <directionalLight
        intensity={0.7}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        position={dLightPos}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-camera-top={-100}
        shadow-camera-bottom={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
      />
      <Sky distance={1000} sunPosition={sunPos} />

      <ambientLight intensity={0.1} />
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[10000, 10000]}
      >
        <shadowMaterial attach="material" opacity={0.4} />
        <meshStandardMaterial attach="material" color="gray" />
      </Plane>

      <BuildingContainer building={building} />

      <SurroundingContext />
    </Canvas>
  );
};
