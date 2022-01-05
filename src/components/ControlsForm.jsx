import { ControlGroup } from "./ControlGroup";
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
          <ControlGroup
            key={`control-group-${table}`}
            table={table}
            data={data}
            building={building}
            setBuilding={setBuilding}
            setLocalBuildingChange={setLocalBuildingChange}
          />
        ))}
      </div>
      <button className="control-form-submit" onClick={submitBuildingData}>
        Submit
      </button>
    </>
  );
};
