import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useCallback } from "react";
import { ControlsForm } from "./ControlsForm";
import { BuildingBasic } from "./BuildingBasic";
import { BuildingOShape } from "./BuildingOShape";
import { SurroundingContext } from "./SurroundingContext";
import { Plane, OrbitControls } from "@react-three/drei";

const buildingComponents = [BuildingBasic, BuildingOShape];

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
      cutoutWidth: 0.5,
      cutoutDepth: 0.5,
      type: 0,
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

  const BuildingComponent = buildingComponents[building.mass.type];

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
        <ControlsForm
          building={building}
          setBuilding={setBuilding}
          setLocalBuildingChange={setLocalBuildingChange}
          submitBuildingData={submitBuildingData}
        />
      </div>
      <Canvas
        className="canvas"
        colorManagement
        shadows
        camera={{ fov: 60, position: [20, 20, -40] }}
      >
        <OrbitControls target={[0, 0, 0]} />
        <directionalLight
          intensity={0.7}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          position={[15, 30, -5]}
        />
        <ambientLight intensity={0.1} />
        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          args={[1000, 1000]}
        >
          <meshStandardMaterial attach="material" color="white" />
        </Plane>

        <BuildingComponent building={building} />

        <SurroundingContext />
      </Canvas>
    </>
  );
};
