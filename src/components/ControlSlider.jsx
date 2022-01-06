import { useCallback, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import { SocketContext } from "../context/SocketContext";
export const ControlSlider = ({ table, parameter, uiConfig }) => {
  const { building, setBuilding } = useContext(BuildingContext);
  const { emitBuildingChange } = useContext(SocketContext);
  const handleParameterChange = useCallback(
    (e) => {
      const newValue = Number(e.target.value);
      setBuilding((oldBuilding) => {
        const newBuilding = { ...oldBuilding };
        newBuilding[table][parameter] = newValue;
        emitBuildingChange(newBuilding);
        return newBuilding;
      });
    },
    [table, parameter, setBuilding, emitBuildingChange]
  );

  const value = building[table][parameter];
  return (
    <div className="control slider">
      <label>{uiConfig.title(parameter, value)}</label>
      <input
        type="range"
        value={value}
        onChange={handleParameterChange}
        min={uiConfig.range[0]}
        max={uiConfig.range[1]}
        step={uiConfig.step}
      />
    </div>
  );
};
