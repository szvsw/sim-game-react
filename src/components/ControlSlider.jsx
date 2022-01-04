import { useCallback } from "react";
export const ControlSlider = ({
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
