import { useCallback } from "react";
export const ControlSlider = ({
  state,
  setState,
  table,
  parameter,
  setLocalBuildingChange,
}) => {
  const uiMetadata = {
    shading: {
      title: (param) => `${param.toUpperCase()} Shading Depth (m)`,
      range: [0, 3],
      step: 0.01,
    },
    wwr: {
      title: (param) => `${param.toUpperCase()} Window-to-Wall Ratio (%)`,
      range: [0, 1],
      step: 0.01,
    },
    mass: {
      floors: {
        title: (param) => `Floors (#)`,
        range: [1, 20],
        step: 1,
      },
      floorHeight: {
        title: (param) => `Floor Height (m)`,
        range: [2.5, 5],
        step: 0.01,
      },
      width: {
        title: (param) => `Width (m)`,
        range: [4, 20],
        step: 0.01,
      },
      depth: {
        title: (param) => `Depth (m)`,
        range: [4, 20],
        step: 0.01,
      },
    },
  };
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
      <label>
        {uiMetadata[table].title
          ? uiMetadata[table].title(parameter)
          : uiMetadata[table][parameter].title()}
      </label>
      <input
        type="number"
        value={state[table][parameter]}
        onChange={handleParameterChange}
        min={
          uiMetadata[table].range
            ? uiMetadata[table].range[0]
            : uiMetadata[table][parameter].range[0]
        }
        max={
          uiMetadata[table].range
            ? uiMetadata[table].range[1]
            : uiMetadata[table][parameter].range[1]
        }
        step={
          uiMetadata[table].step
            ? uiMetadata[table].step
            : uiMetadata[table][parameter].step
        }
      />
    </div>
  );
};
