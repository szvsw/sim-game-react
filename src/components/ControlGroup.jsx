import { uiMetadata } from "../uiMetadata";
import { useState } from "react";
export const ControlGroup = ({
  building,
  setBuilding,
  setLocalBuildingChange,
  table,
  data,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="control-group-container">
      <button
        className={`control-group-expander`}
        onClick={() => setExpanded((_expanded) => !_expanded)}
      >
        {uiMetadata[table].tableTitle}
      </button>
      {expanded ? (
        <div className="control-group">
          {Object.entries(data).map(([parameter, value], i) => {
            const Component = uiMetadata[table].component
              ? uiMetadata[table].component
              : uiMetadata[table][parameter].component;
            const uiConfig = uiMetadata[table].config
              ? uiMetadata[table].config
              : uiMetadata[table][parameter].config;
            const uiConditional = uiMetadata[table].component
              ? uiMetadata[table].conditional
              : uiMetadata[table][parameter].conditional;

            const condition = uiConditional ? uiConditional(building) : true;

            return condition ? (
              <Component
                className="control"
                key={`control-${table}-${parameter}`}
                table={table}
                parameter={parameter}
                building={building}
                setBuilding={setBuilding}
                setLocalBuildingChange={setLocalBuildingChange}
                uiConfig={uiConfig}
              />
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
};
