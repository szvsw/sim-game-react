import { BuildingBlock } from "./BuildingBlock";
export const BuildingOShape = ({ building }) => {
  const trueCutoutWidth = building.mass.width * building.mass.cutoutWidth;
  const trueCutoutDepth = building.mass.depth * building.mass.cutoutDepth;
  const usableWidth = (building.mass.width - trueCutoutWidth) / 2;
  const usableDepth = (building.mass.depth - trueCutoutDepth) / 2;
  const cornerBlock = {
    ...building,
    mass: {
      ...building.mass,
      depth: usableDepth,
      width: usableWidth,
    },
  };
  const linkageDepth = {
    ...building,
    mass: { ...cornerBlock.mass, depth: trueCutoutDepth },
  };
  const linkageWidth = {
    ...building,
    mass: { ...cornerBlock.mass, width: trueCutoutWidth },
  };

  const fullMass = {
    ...building,
  };
  return (
    <>
      {/* corners */}
      <BuildingBlock block building={cornerBlock} position={[0, 0, 0]} />
      <BuildingBlock
        block
        building={cornerBlock}
        position={[usableWidth + trueCutoutWidth, 0, 0]}
      />
      <BuildingBlock
        block
        building={cornerBlock}
        position={[0, 0, usableDepth + trueCutoutDepth]}
      />
      <BuildingBlock
        block
        building={cornerBlock}
        position={[
          usableWidth + trueCutoutWidth,
          0,
          usableDepth + trueCutoutDepth,
        ]}
      />
      {/* Horizontal Linkages */}
      <BuildingBlock
        block
        shadingN
        windowsN
        building={linkageWidth}
        position={[usableWidth, 0, 0]}
      />
      <BuildingBlock
        block
        shadingS
        windowsS
        building={linkageWidth}
        position={[usableWidth, 0, usableDepth + trueCutoutDepth]}
      />
      {/* Depth Linkages */}
      <BuildingBlock
        block
        shadingW
        windowsW
        building={linkageDepth}
        position={[0, 0, usableDepth]}
      />

      <BuildingBlock
        block
        shadingE
        windowsE
        building={linkageDepth}
        position={[usableWidth + trueCutoutWidth, 0, usableDepth]}
      />
      <BuildingBlock shadingAll windowsAll building={fullMass} />
    </>
  );
};
