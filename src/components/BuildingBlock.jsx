import * as THREE from "three";
import { Plane, Box } from "@react-three/drei";
export const BuildingBlock = ({
  position,
  building,
  shadingAll,
  windowsAll,
  block,
  windowsW,
  windowsE,
  windowsS,
  windowsN,
  shadingE,
  shadingS,
  shadingN,
  shadingW,
}) => {
  const { mass, shading, wwr } = building;
  const buildingGeometry = [];
  for (let i = 0; i < mass.floors; i++) {
    // Shading
    if (shadingAll || shadingW)
      buildingGeometry.push(
        <Plane
          key={`shading-w-${i}`}
          position={[
            shading.w / 2 + mass.width,
            mass.floorHeight / 2 +
              i * mass.floorHeight +
              (mass.floorHeight * Math.sqrt(wwr.w)) / 2,
            mass.depth / 2,
          ]}
          args={[mass.depth * Math.sqrt(wwr.w), shading.w]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial
            side={THREE.DoubleSide}
            attach="material"
            color="gray"
          />
        </Plane>
      );
    if (shadingAll || shadingE)
      buildingGeometry.push(
        <Plane
          key={`shading-e-${i}`}
          position={[
            -shading.e / 2,
            mass.floorHeight / 2 +
              i * mass.floorHeight +
              (mass.floorHeight * Math.sqrt(wwr.e)) / 2,
            mass.depth / 2,
          ]}
          args={[mass.depth * Math.sqrt(wwr.e), shading.e]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial
            side={THREE.DoubleSide}
            attach="material"
            color="gray"
          />
        </Plane>
      );

    if (shadingAll || shadingN)
      buildingGeometry.push(
        <Plane
          key={`shading-n-${i}`}
          position={[
            mass.width / 2,
            mass.floorHeight / 2 +
              i * mass.floorHeight +
              (mass.floorHeight * Math.sqrt(wwr.n)) / 2,
            shading.n / 2 + mass.depth,
          ]}
          args={[shading.n, mass.width * Math.sqrt(wwr.n)]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial
            side={THREE.DoubleSide}
            attach="material"
            color="gray"
          />
        </Plane>
      );

    if (shadingAll || shadingS)
      buildingGeometry.push(
        <Plane
          key={`shading-s-${i}`}
          position={[
            mass.width / 2,
            mass.floorHeight / 2 +
              i * mass.floorHeight +
              (mass.floorHeight * Math.sqrt(wwr.s)) / 2,
            -shading.s / 2,
          ]}
          args={[shading.s, mass.width * Math.sqrt(wwr.s)]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial
            side={THREE.DoubleSide}
            attach="material"
            color="gray"
          />
        </Plane>
      );
    // Windows
    if (windowsAll || windowsE)
      buildingGeometry.push(
        <Plane
          position={[
            -0.01,
            mass.floorHeight / 2 + i * mass.floorHeight,
            mass.depth / 2,
          ]}
          args={[
            mass.depth * Math.sqrt(wwr.e),
            mass.floorHeight * Math.sqrt(wwr.e),
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

    if (windowsAll || windowsW)
      buildingGeometry.push(
        <Plane
          position={[
            mass.width + 0.01,
            mass.floorHeight / 2 + i * mass.floorHeight,
            mass.depth / 2,
          ]}
          args={[
            mass.depth * Math.sqrt(wwr.w),
            mass.floorHeight * Math.sqrt(wwr.w),
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
    if (windowsAll || windowsN)
      buildingGeometry.push(
        <Plane
          position={[
            mass.width / 2,
            mass.floorHeight / 2 + i * mass.floorHeight,
            mass.depth + 0.01,
          ]}
          args={[
            mass.width * Math.sqrt(wwr.n),
            mass.floorHeight * Math.sqrt(wwr.n),
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
    if (windowsAll || windowsS)
      buildingGeometry.push(
        <Plane
          position={[
            mass.width / 2,
            mass.floorHeight / 2 + i * mass.floorHeight,
            -0.01,
          ]}
          args={[
            mass.width * Math.sqrt(wwr.s),
            mass.floorHeight * Math.sqrt(wwr.s),
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
    if (block)
      buildingGeometry.push(
        <Box
          key={`floor-${i}`}
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          position={[
            mass.width / 2,
            mass.floorHeight / 2 + i * mass.floorHeight,
            mass.depth / 2,
          ]}
          scale={[mass.width, mass.floorHeight, mass.depth]}
        >
          <meshStandardMaterial attach="material" color="white" />
        </Box>
      );
  }

  return (
    <>
      <group position={position}>{buildingGeometry}</group>
    </>
  );
};
