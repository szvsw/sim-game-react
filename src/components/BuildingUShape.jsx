import { BuildingBlock } from "./BuildingBlock";
export const BuildingUShape = ({ building }) => {
  const orientation = 0;
  const trueCutoutWidth = building.mass.width * building.mass.cutoutWidth;
  const trueCutoutDepth = building.mass.depth * building.mass.cutoutDepth;
  const usableWidth = (building.mass.width - trueCutoutWidth) / 2;
  const usableDepth = (building.mass.depth - trueCutoutDepth) / 2;
  const extenderDepth = trueCutoutDepth + usableDepth;
  const extenderWidth = trueCutoutWidth + usableWidth;
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

  const extensionDepth = {
    ...building,
    mass: {
      ...cornerBlock.mass,
      depth: extenderDepth,
    },
  };

  const extensionWidth = {
    ...building,
    mass: {
      ...cornerBlock.mass,
      width: extenderWidth,
    },
  };

  const fullMass = {
    ...building,
  };
  return (
    <>
      <BuildingBlock
        shadingE={orientation === 2 || orientation === 0}
        windowsE={orientation === 2 || orientation === 0}
        building={extensionDepth}
        position={[extenderWidth, 0, orientation === 2 ? usableDepth : 0]}
      />
      <BuildingBlock
        shadingW={orientation === 2 || orientation === 0}
        windowsW={orientation === 2 || orientation === 0}
        building={extensionDepth}
        position={[0, 0, orientation === 2 ? usableDepth : 0]}
      />
      <BuildingBlock
        shadingS={orientation === 3 || orientation === 1}
        windowsS={orientation === 3 || orientation === 1}
        building={extensionWidth}
        position={[orientation === 3 ? usableWidth : 0, 0, extenderDepth]}
      />
      <BuildingBlock
        shadingN={orientation === 3 || orientation === 1}
        windowsN={orientation === 3 || orientation === 1}
        building={extensionWidth}
        position={[orientation === 3 ? usableWidth : 0, 0, 0]}
      />
      {/* corners */}
      <BuildingBlock
        block
        windowsS={orientation === 0}
        shadingS={orientation === 0}
        windowsE={orientation === 1}
        shadingE={orientation === 1}
        building={cornerBlock}
        position={[0, 0, 0]}
      />
      <BuildingBlock
        block
        windowsS={orientation === 0}
        shadingS={orientation === 0}
        windowsW={orientation === 3}
        shadingW={orientation === 3}
        building={cornerBlock}
        position={[usableWidth + trueCutoutWidth, 0, 0]}
      />
      <BuildingBlock
        block
        windowsE={orientation === 1}
        shadingE={orientation === 1}
        windowsN={orientation === 2}
        shadingN={orientation === 2}
        building={cornerBlock}
        position={[0, 0, usableDepth + trueCutoutDepth]}
      />
      <BuildingBlock
        block
        windowsN={orientation === 2}
        shadingN={orientation === 2}
        windowsW={orientation === 3}
        shadingW={orientation === 3}
        building={cornerBlock}
        position={[
          usableWidth + trueCutoutWidth,
          0,
          usableDepth + trueCutoutDepth,
        ]}
      />
      {/* Horizontal Linkages*/}
      {orientation !== 0 ? (
        <BuildingBlock
          block
          shadingN={orientation !== 1 && orientation !== 3}
          windowsN={orientation !== 1 && orientation !== 3}
          building={linkageWidth}
          position={[usableWidth, 0, 0]}
        />
      ) : null}
      {orientation !== 2 ? (
        <BuildingBlock
          block
          shadingS={orientation !== 1 && orientation !== 3}
          windowsS={orientation !== 1 && orientation !== 3}
          building={linkageWidth}
          position={[usableWidth, 0, usableDepth + trueCutoutDepth]}
        />
      ) : null}

      {/* Depth Linkages */}
      {orientation !== 1 ? (
        <BuildingBlock
          block
          shadingW={orientation !== 0 && orientation !== 2}
          windowsW={orientation !== 0 && orientation !== 2}
          building={linkageDepth}
          position={[0, 0, usableDepth]}
        />
      ) : null}

      {orientation !== 3 ? (
        <BuildingBlock
          block
          shadingE={orientation !== 0 && orientation !== 2}
          windowsE={orientation !== 0 && orientation !== 2}
          building={linkageDepth}
          position={[usableWidth + trueCutoutWidth, 0, usableDepth]}
        />
      ) : null}
      <BuildingBlock
        windowsW={orientation !== 3}
        shadingW={orientation !== 3}
        windowsE={orientation !== 1}
        shadingE={orientation !== 1}
        windowsN={orientation !== 2}
        shadingN={orientation !== 2}
        windowsS={orientation !== 0}
        shadingS={orientation !== 0}
        building={fullMass}
      />
    </>
  );
};
