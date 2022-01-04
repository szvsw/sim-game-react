import { useCallback } from "react";
export const ControlDropdown = ({
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
      <label htmlFor={`control-${table}-${parameter}-dropdown`}>
        {uiConfig.title(parameter)}
      </label>
      <select
        name={`control-${table}-${parameter}-dropdown`}
        id={`control-${table}-${parameter}-dropdown`}
        // type="number"
        value={state[table][parameter]}
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
