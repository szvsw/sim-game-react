import { Canvas } from "@react-three/fiber";
import { Plane, Box, OrbitControls } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { uiMetadata } from "./uiMetadata";

export const Builder = ({ socket }) => {
  const [cost, setCost] = useState(null);
  const [serverIsComputingCost, setServerIsComputingCost] = useState(true);
  const [eui, setEui] = useState("No results calculated yet.");
  const [serverIsComputingEui, setServerIsComputingEui] = useState(false);
  const [localBuildingChange, setLocalBuildingChange] = useState(false);
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
    glazing: {
      assembly: 0,
    },
    envelope: {
      walls: 0,
      roofs: 0,
      floors: 0,
      tightness: 0,
    },
    lighting: {
      dimming: 0,
      type: 0,
    },
    hvac: {
      hrv: 0,
      source: 0,
      fans: 0,
    },
  });

  const submitBuildingData = useCallback(() => {
    if (socket) socket.emit("compute eui", 1);
    setServerIsComputingEui(true);
  }, [setServerIsComputingEui, socket]);

  useEffect(() => {
    if (socket)
      socket.on("eui", (data) => {
        setEui(data);
        setServerIsComputingEui(false);
      });
  }, [socket, setEui, setServerIsComputingEui]);

  useEffect(() => {
    if (socket)
      socket.on("cost", (data) => {
        setCost(data);
        setServerIsComputingCost(false);
      });
  }, [socket, setCost, setServerIsComputingCost]);

  // TODO: make sure socket still connected, use cleanup
  useEffect(() => {
    if (socket) {
      if (localBuildingChange) socket.emit("building", building);
      setServerIsComputingCost(true);
      setLocalBuildingChange(false);
    }
  }, [
    building,
    socket,
    localBuildingChange,
    setLocalBuildingChange,
    setServerIsComputingCost,
  ]);

  useEffect(() => {
    if (socket)
      socket.on("building", (data) => {
        console.log(data);
        setBuilding(data);
      });
  }, [socket, setBuilding]);
  return (
    <>
      <div className="userInterface">
        <div className="computedValues">
          <h1>COST: {serverIsComputingCost ? "(computing)" : `$${cost}USD`}</h1>
          <h1>
            EUI :{" "}
            {serverIsComputingEui
              ? "(computing)"
              : isNaN(eui)
              ? "No EUI Calculation yet"
              : `${eui.toFixed(1)} kWh/m^2/yr (${(eui * 0.31).toFixed(
                  1
                )} kBtu/ft^2/yr)`}
          </h1>
        </div>
        <div className="controls">
          {Object.entries(building).map(([table, data], i) => (
            <div>
              <h3>{uiMetadata[table].tableTitle}</h3>
              {Object.entries(data).map(([parameter, value], i) => {
                const uiComponent = uiMetadata[table].component
                  ? uiMetadata[table].component
                  : uiMetadata[table][parameter].component;
                const uiConfig = uiMetadata[table].config
                  ? uiMetadata[table].config
                  : uiMetadata[table][parameter].config;
                const Component = uiComponent({
                  key: `control-${table}-${parameter}`,
                  table,
                  parameter,
                  state: building,
                  setState: setBuilding,
                  setLocalBuildingChange,
                  uiConfig,
                });
                return Component;
              })}
            </div>
          ))}
        </div>
        <button onClick={submitBuildingData}>Submit</button>
      </div>
      <Canvas
        className="canvas"
        colorManagement
        shadows
        camera={{ fov: 60, position: [20, 20, -40] }}
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
        position={[15, 30, -5]}
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
