import { Canvas } from "@react-three/fiber";
import { Plane, Box, OrbitControls } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { ControlSlider } from "./ControlSlider";

export const Controls = () => {
  const [building, setBuilding] = useState({
    mass: {
      floors: 4,
      floorHeight: 3,
      width: 9,
      depth: 7,
    },
    shading: {
      s: 1,
      n: 0.3,
      e: 0.5,
      w: 0.7,
    },
    wwr: {
      s: 0.1,
      n: 0.9,
      e: 0.3,
      w: 0.5,
    },
  });
  return (
    <>
      <div className="controls">
        {Object.entries(building).map(([table, data], i) =>
          Object.entries(data).map(([parameter, value], i) => (
            <ControlSlider
              key={`control-${table}-${parameter}`}
              table={table}
              parameter={parameter}
              state={building}
              setState={setBuilding}
            />
          ))
        )}
      </div>
      <Canvas
        className="canvas"
        colorManagement
        shadows
        camera={{ fov: 60, position: [30, 10, 30] }}
      >
        <Building building={building} />
        <SurroundingContext />
      </Canvas>
    </>
  );
};

export const Building = ({ building, context }) => {
  const buildingGeometry = [];
  for (let i = 0; i < building.mass.floors; i++) {
    // Shading
    buildingGeometry.push(
      <Plane
        key={`shading-w-${i}`}
        position={[
          building.shading.w / 2 + building.mass.width,
          building.mass.floorHeight / 2 +
            i * building.mass.floorHeight +
            (building.mass.floorHeight * Math.sqrt(building.wwr.w)) / 2,
          building.mass.depth / 2,
        ]}
        args={[
          building.mass.depth * Math.sqrt(building.wwr.w),
          building.shading.w,
        ]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="red"
        />
      </Plane>
    );
    buildingGeometry.push(
      <Plane
        key={`shading-e-${i}`}
        position={[
          -building.shading.e / 2,
          building.mass.floorHeight / 2 +
            i * building.mass.floorHeight +
            (building.mass.floorHeight * Math.sqrt(building.wwr.e)) / 2,
          building.mass.depth / 2,
        ]}
        args={[
          building.mass.depth * Math.sqrt(building.wwr.e),
          building.shading.e,
        ]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="red"
        />
      </Plane>
    );

    buildingGeometry.push(
      <Plane
        key={`shading-n-${i}`}
        position={[
          building.mass.width / 2,
          building.mass.floorHeight / 2 +
            i * building.mass.floorHeight +
            (building.mass.floorHeight * Math.sqrt(building.wwr.n)) / 2,
          building.shading.n / 2 + building.mass.depth,
        ]}
        args={[
          building.shading.n,
          building.mass.width * Math.sqrt(building.wwr.n),
        ]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="red"
        />
      </Plane>
    );

    buildingGeometry.push(
      <Plane
        key={`shading-s-${i}`}
        position={[
          building.mass.width / 2,
          building.mass.floorHeight / 2 +
            i * building.mass.floorHeight +
            (building.mass.floorHeight * Math.sqrt(building.wwr.s)) / 2,
          -building.shading.s / 2,
        ]}
        args={[
          building.shading.s,
          building.mass.width * Math.sqrt(building.wwr.s),
        ]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="red"
        />
      </Plane>
    );

    // Windows
    buildingGeometry.push(
      <Plane
        position={[
          -0.01,
          building.mass.floorHeight / 2 + i * building.mass.floorHeight,
          building.mass.depth / 2,
        ]}
        args={[
          building.mass.depth * Math.sqrt(building.wwr.e),
          building.mass.floorHeight * Math.sqrt(building.wwr.e),
        ]}
        rotation={[0, -Math.PI / 2, 0]}
        key={`window-e-${i}`}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="blue"
        />
      </Plane>
    );
    buildingGeometry.push(
      <Plane
        position={[
          building.mass.width + 0.01,
          building.mass.floorHeight / 2 + i * building.mass.floorHeight,
          building.mass.depth / 2,
        ]}
        args={[
          building.mass.depth * Math.sqrt(building.wwr.w),
          building.mass.floorHeight * Math.sqrt(building.wwr.w),
        ]}
        rotation={[0, Math.PI / 2, 0]}
        key={`window-w-${i}`}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="blue"
        />
      </Plane>
    );
    buildingGeometry.push(
      <Plane
        position={[
          building.mass.width / 2,
          building.mass.floorHeight / 2 + i * building.mass.floorHeight,
          building.mass.depth + 0.01,
        ]}
        args={[
          building.mass.width * Math.sqrt(building.wwr.n),
          building.mass.floorHeight * Math.sqrt(building.wwr.n),
        ]}
        rotation={[0, 0, 0]}
        key={`window-n-${i}`}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="blue"
        />
      </Plane>
    );
    buildingGeometry.push(
      <Plane
        position={[
          building.mass.width / 2,
          building.mass.floorHeight / 2 + i * building.mass.floorHeight,
          -0.01,
        ]}
        args={[
          building.mass.width * Math.sqrt(building.wwr.s),
          building.mass.floorHeight * Math.sqrt(building.wwr.s),
        ]}
        rotation={[Math.PI, 0, 0]}
        key={`window-s-${i}`}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          attach="material"
          color="blue"
        />
      </Plane>
    );

    // Floors
    buildingGeometry.push(
      <Box
        key={`floor-${i}`}
        castShadow
        receiveShadow
        rotation={[0, 0, 0]}
        position={[
          building.mass.width / 2,
          building.mass.floorHeight / 2 + i * building.mass.floorHeight,
          building.mass.depth / 2,
        ]}
        scale={[
          building.mass.width,
          building.mass.floorHeight,
          building.mass.depth,
        ]}
      >
        <meshStandardMaterial attach="material" color="green" />
      </Box>
    );
  }

  return (
    <>
      <OrbitControls target={[0, 0, 0]} />
      <directionalLight
        intensity={0.7}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        position={[15, 30, 5]}
      />
      <ambientLight intensity={0.1} />

      {buildingGeometry}
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[1000, 1000]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </>
  );
};

export const SurroundingContext = () => {
  const [context, setContext] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./model.json");
      const { context } = await res.json();
      setContext(context);
    };
    fetchData();
  }, []);

  const contextGeometry = context.map((_geometry, _ix) => {
    const { position, rotation, size } = _geometry;
    return (
      <Box
        key={`context-${_ix}`}
        castShadow
        receiveShadow
        rotation={rotation}
        position={[position[0], position[1] + size[1] / 2, position[2]]}
        args={size}
      >
        <meshStandardMaterial attach="material" color="hotPink" />
      </Box>
    );
  });
  return <>{contextGeometry}</>;
};
