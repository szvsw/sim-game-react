import { uiMetadata } from "../uiMetadata";
export const ControlsForm = ({
  building,
  setBuilding,
  setLocalBuildingChange,
  submitBuildingData,
}) => {
  return (
    <>
      <div className="controls-form">
        {Object.entries(building).map(([table, data], i) => (
          <div key={`control-group-${table}-${i}`}>
            <h3>{uiMetadata[table].tableTitle}</h3>
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
                  key={`control-${table}-${parameter}`}
                  table={table}
                  parameter={parameter}
                  state={building}
                  setState={setBuilding}
                  setLocalBuildingChange={setLocalBuildingChange}
                  uiConfig={uiConfig}
                />
              ) : null;
            })}
          </div>
        ))}
      </div>
      <button onClick={submitBuildingData}>Submit</button>
    </>
  );
};
