import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useCallback } from "react";
import { ControlsForm } from "./ControlsForm";
import { BuildingBasic } from "./BuildingBasic";
import { BuildingOShape } from "./BuildingOShape";
import { BuildingUShape } from "./BuildingUShape";
import { SurroundingContext } from "./SurroundingContext";
import { Plane, OrbitControls } from "@react-three/drei";
import { StackedBarChart } from "./StackedBarChart";

const buildingComponents = [BuildingBasic, BuildingOShape, BuildingUShape];

export const Builder = ({ socket }) => {
  const [cost, setCost] = useState(null);
  const [serverIsComputingCost, setServerIsComputingCost] = useState(true);
  const [eui, setEui] = useState("No results calculated yet.");
  const [results, setResults] = useState(null);
  const [serverIsComputingEui, setServerIsComputingEui] = useState(false);
  const [localBuildingChange, setLocalBuildingChange] = useState(false);
  const [floorArea, setFloorArea] = useState(0);
  const [building, setBuilding] = useState({
    mass: {
      floors: 4,
      floorHeight: 3,
      width: 9,
      depth: 7,
      cutoutWidth: 0.5,
      cutoutDepth: 0.5,
      orientation: 0,
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

  useEffect(() => {
    const _floorArea =
      (building.mass.width * building.mass.depth -
        (building.mass.type > 0
          ? building.mass.width *
            building.mass.cutoutWidth *
            building.mass.width *
            building.mass.cutoutDepth
          : 0)) *
      building.mass.floors;

    setFloorArea(_floorArea);
  }, [building, setFloorArea]);

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
      socket.on("results", (data) => {
        setResults(data);
      });
  }, [socket, setResults]);

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
        setBuilding(data);
      });
  }, [socket, setBuilding]);
  return (
    <>
      <div className="userInterface">
        <div className="controls-and-computed">
          <ControlsForm
            building={building}
            setBuilding={setBuilding}
            setLocalBuildingChange={setLocalBuildingChange}
            submitBuildingData={submitBuildingData}
          />
          <div className="computedValues">
            <p>Floor Area: {floorArea.toFixed(0)}m^2</p>
            <p>COST: {serverIsComputingCost ? "(computing)" : `$${cost}USD`}</p>
            <p>
              EUI :{" "}
              {serverIsComputingEui
                ? "(computing)"
                : isNaN(eui)
                ? "No EUI Calculation yet"
                : eui
                ? `${eui.toFixed(1)} kWh/m^2/yr (${(eui * 0.31).toFixed(
                    1
                  )} kBtu/ft^2/yr)`
                : "No EUI calculation yet"}
            </p>
          </div>
        </div>
        <StackedBarChart results={results} />
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
