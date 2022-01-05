import { BuildingBlock } from "./BuildingBlock";
export const BuildingUShape = ({ building }) => {
  const { orientation } = building.mass;
  const trueCutoutWidth = building.mass.width * building.mass.cutoutWidth;
  const trueCutoutDepth = building.mass.depth * building.mass.cutoutDepth;
  const corridorPerpendicularWidth =
    (building.mass.width - trueCutoutWidth) /
    (orientation === 1 || orientation === 3 ? 1 : 2);
  const corridorPerpendicularDepth =
    (building.mass.depth - trueCutoutDepth) /
    (orientation === 0 || orientation === 2 ? 1 : 2);

  const fullDepthBlock = {
    ...building,
    mass: {
      ...building.mass,
      width: corridorPerpendicularWidth,
    },
  };
  const linkageDepthBlock = {
    ...building,
    mass: {
      ...building.mass,
      depth: trueCutoutDepth,
      width: corridorPerpendicularWidth,
    },
  };

  const fullWidthBlock = {
    ...building,
    mass: {
      ...building.mass,
      depth: corridorPerpendicularDepth,
    },
  };
  const linkageWidthBlock = {
    ...building,
    mass: {
      ...building.mass,
      width: trueCutoutWidth,
      depth: corridorPerpendicularDepth,
    },
  };
  return (
    <>
      <BuildingBlock
        block={orientation !== 0}
        windowsS={orientation !== 0}
        shadingS={orientation !== 0}
        building={fullWidthBlock}
        position={[0, 0, 0]}
      />
      <BuildingBlock
        block={orientation !== 2}
        windowsN={orientation !== 2}
        shadingN={orientation !== 2}
        building={fullWidthBlock}
        position={[
          0,
          0,
          trueCutoutDepth +
            (orientation === 1 || orientation === 3
              ? corridorPerpendicularDepth
              : 0),
        ]}
      />
      <BuildingBlock
        block={orientation !== 1}
        windowsE={orientation !== 1}
        shadingE={orientation !== 1}
        building={fullDepthBlock}
        position={[0, 0, 0]}
      />
      <BuildingBlock
        block={orientation !== 3}
        windowsW={orientation !== 3}
        shadingW={orientation !== 3}
        building={fullDepthBlock}
        position={[
          trueCutoutWidth +
            (orientation === 0 || orientation === 2
              ? corridorPerpendicularWidth
              : 0),
          0,
          0,
        ]}
      />
      {/* */}
      <BuildingBlock
        windowsS={orientation === 0}
        windowsN={orientation === 2}
        shadingS={orientation === 0}
        shadingN={orientation === 2}
        building={linkageWidthBlock}
        position={[
          corridorPerpendicularWidth,
          0,
          orientation === 0 ? trueCutoutDepth : 0,
        ]}
      />
      <BuildingBlock
        windowsE={orientation === 1}
        windowsW={orientation === 3}
        shadingE={orientation === 1}
        shadingW={orientation === 3}
        building={linkageDepthBlock}
        position={[
          orientation === 1 ? trueCutoutWidth : 0,
          0,
          corridorPerpendicularDepth,
        ]}
      />

      {/* */}

      <BuildingBlock
        windowsW={orientation % 2 === 0}
        shadingW={orientation % 2 === 0}
        building={linkageDepthBlock}
        position={[0, 0, orientation === 2 ? corridorPerpendicularDepth : 0]}
      />
      <BuildingBlock
        windowsE={orientation % 2 === 0}
        shadingE={orientation % 2 === 0}
        building={linkageDepthBlock}
        position={[
          trueCutoutWidth + corridorPerpendicularWidth,
          0,
          orientation === 2 ? corridorPerpendicularDepth : 0,
        ]}
      />
      <BuildingBlock
        windowsN={orientation % 2 === 1}
        shadingN={orientation % 2 === 1}
        building={linkageWidthBlock}
        position={[orientation === 3 ? corridorPerpendicularWidth : 0, 0, 0]}
      />
      <BuildingBlock
        windowsS={orientation % 2 === 1}
        shadingS={orientation % 2 === 1}
        building={linkageWidthBlock}
        position={[
          orientation === 3 ? corridorPerpendicularWidth : 0,
          0,
          trueCutoutDepth + corridorPerpendicularDepth,
        ]}
      />
    </>
  );
};
