import { Box, Line } from "@react-three/drei";
import { useState, useEffect } from "react";
export const SurroundingContext = () => {
  const [_context, setContext] = useState([]);
  const [_boundary, setBoundary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./model.json");
      const { boundary, context } = await res.json();
      setContext(context);
      setBoundary(boundary);
    };
    fetchData();
  }, []);

  const siteBoundaryPoints = _boundary?.map((pt) => [
    -pt[0],
    pt[2] + 0.05,
    pt[1],
  ]);

  if (_boundary) siteBoundaryPoints.push(siteBoundaryPoints[0]);
  const contextGeometry = _context.map((_geometry, _ix) => {
    const { position, rotation, size } = _geometry;
    return (
      <Box
        key={`context-${_ix}`}
        castShadow
        rotation={rotation}
        position={[
          -(position[0] + size[0] / 2),
          size[2] / 2,
          position[1] + size[1] / 2,
        ]}
        args={[size[0], size[2], size[1]]}
      >
        <meshStandardMaterial attach="material" color="dimGray" />
      </Box>
    );
  });
  return (
    <>
      {contextGeometry}
      {_boundary ? (
        <Line closed points={siteBoundaryPoints} color="red" />
      ) : null}
    </>
  );
};
