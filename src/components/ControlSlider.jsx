import { useCallback } from "react";
export const ControlSlider = ({
  state,
  setState,
  setLocalBuildingChange,
  table,
  parameter,
  uiConfig,
}) => {
  const handleParameterChange = useCallback(
    (e) => {
      const newValue = Number(e.target.value);
      setState((oldState) => {
        const newState = { ...oldState };
        newState[table][parameter] = newValue;
        return newState;
      });
      setLocalBuildingChange(true);
    },
    [table, parameter, setState, setLocalBuildingChange]
  );
  return (
    <div className="control">
      <label>{uiConfig.title(parameter)}</label>
      <input
        type="number"
        value={state[table][parameter]}
        onChange={handleParameterChange}
        min={uiConfig.range[0]}
        max={uiConfig.range[1]}
        step={uiConfig.step}
      />
    </div>
  );
};
