import { useEffect, useState, createContext } from "react";

export const BuildingContext = createContext();

export const BuildingContextProvider = ({ children }) => {
  const [building, setBuilding] = useState({
    positioning: {
      x: 0,
      y: 0,
    },
    mass: {
      floors: 3,
      floorHeight: 3,
      width: 40,
      depth: 20,
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
    sun: {
      month: 6,
      day: 21,
      hour: 12,
    },
  });

  const [floorArea, setFloorArea] = useState(0);

  useEffect(() => {
    const _floorArea =
      (building.mass.width * building.mass.depth -
        (building.mass.type > 0
          ? building.mass.width * building.mass.cutoutWidth * building.mass.width * building.mass.cutoutDepth
          : 0)) *
      building.mass.floors;

    setFloorArea(_floorArea);
  }, [building, setFloorArea]);

  return (
    <BuildingContext.Provider value={{ building, setBuilding, floorArea }}>
      {children}
    </BuildingContext.Provider>
  );
};
