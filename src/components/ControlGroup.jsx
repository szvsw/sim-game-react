import { uiMetadata } from "../uiMetadata";
import { useState, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
export const ControlGroup = ({ table }) => {
  const { building } = useContext(BuildingContext);
  const [expanded, setExpanded] = useState(false);
  const data = building[table];
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
                uiConfig={uiConfig}
              />
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
};
