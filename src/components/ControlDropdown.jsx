import { useContext, useCallback } from "react";
import { BuildingContext } from "../context/BuildingContext";
import { SocketContext } from "../context/SocketContext";

export const ControlDropdown = ({ table, parameter, uiConfig }) => {
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
  return (
    <div className="control dropdown">
      <label htmlFor={`control-${table}-${parameter}-dropdown`}>
        {uiConfig.title(parameter)}
      </label>
      <select
        name={`control-${table}-${parameter}-dropdown`}
        id={`control-${table}-${parameter}-dropdown`}
        // type="number"
        value={building[table][parameter]}
        onChange={handleParameterChange}
      >
        {uiConfig.options.map((key, index) => (
          <option
            key={`control-${table}-${parameter}-option-${index}`}
            value={index}
          >
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
