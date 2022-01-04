import { Box } from "@react-three/drei";
import { useState, useEffect } from "react";
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
