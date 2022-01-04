import { useCallback } from "react";
export const ControlDropdown = ({
  building,
  setBuilding,
  setLocalBuildingChange,
  table,
  parameter,
  uiConfig,
}) => {
  const handleParameterChange = useCallback(
    (e) => {
      const newValue = Number(e.target.value);
      setBuilding((oldBuilding) => {
        const newBuilding = { ...oldBuilding };
        newBuilding[table][parameter] = newValue;
        return newBuilding;
      });
      setLocalBuildingChange(true);
    },
    [table, parameter, setBuilding, setLocalBuildingChange]
  );
  return (
    <div className="control">
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
