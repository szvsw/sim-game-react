import { BuildingBasic } from "./BuildingBasic";
import { BuildingOShape } from "./BuildingOShape";
import { BuildingUShape } from "./BuildingUShape";

const buildingComponents = [BuildingBasic, BuildingOShape, BuildingUShape];

export const BuildingContainer = ({ building }) => {
  const BuildingComponent = buildingComponents[building.mass.type];

  return (
    <group
      position={[
        -(building.mass.width + building.positioning.x),
        0,
        building.positioning.y,
      ]}
    >
      <BuildingComponent building={building} />
    </group>
  );
};
