import { useState, useCallback, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import { SocketContext } from "../context/SocketContext";
import { ControlGroup } from "./ControlGroup";

export const ControlsForm = () => {
  const { building, setBuilding, floorArea } = useContext(BuildingContext);
  const {
    emitBuildingChange,
    submitBuildingData,
    cost,
    serverIsComputingCost,
  } = useContext(SocketContext);
  const [savedConfigurations, setSavedConfigurations] = useState([]);
  const [configurationName, setConfigurationName] = useState("Baseline");
  const [visible, setVisible] = useState(false);

  const saveConfiguration = useCallback(
    // TODO: Figure out why dereferencing building isn't working and why entries in table seem to get overwritten...
    (e) => {
      setSavedConfigurations((configs) => {
        const { mass, wwr, shading, hvac, lighting, envelope, glazing } =
          building;
        const buildingToSave = {
          mass: { ...mass },
          wwr: { ...wwr },
          shading: { ...shading },
          hvac: { ...hvac },
          lighting: { ...lighting },
          envelope: { ...envelope },
          glazing: { ...glazing },
        };
        return [
          ...configs,
          { name: configurationName, data: { ...buildingToSave } },
        ];
      });
    },
    [building, configurationName, savedConfigurations, setSavedConfigurations]
  );

  const recallConfiguration = useCallback(
    (id) => {
      setBuilding(savedConfigurations[id].data);
      emitBuildingChange();
    },
    [savedConfigurations, setBuilding, emitBuildingChange]
  );
  return (
    <div className="controls-form">
      <button
        className="controls-form-expander"
        onClick={() => setVisible((prev) => !prev)}
      >
        <div>Configure </div>
        <div>{floorArea.toFixed(0)}m^2</div>
        <div>${serverIsComputingCost || !cost ? "--" : cost}</div>
      </button>
      {visible ? (
        <div className="control-groups">
          {Object.entries(building).map(([table, data], i) => (
            <ControlGroup key={`control-group-${table}`} table={table} />
          ))}
        </div>
      ) : null}
      <div className="controls-form-footer">
        <label htmlFor="configurationName">Name: </label>
        <input
          id="configurationName"
          type="text"
          placeholder={configurationName}
          onChange={(e) => setConfigurationName(e.target.value)}
        />
        <button className="controls-form-btn" onClick={saveConfiguration}>
          Save
        </button>
        {savedConfigurations.map((config, i) => (
          <button
            onClick={() => recallConfiguration(i)}
            key={`recall-${config.name}-${i}`}
          >
            {config.name}
          </button>
        ))}
        <button className="controls-form-btn" onClick={submitBuildingData}>
          Calculate EUI
        </button>
      </div>
    </div>
  );
};
