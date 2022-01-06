import { ControlsForm } from "./ControlsForm";
import { StackedBarChart } from "./StackedBarChart";

export const Dashboard = () => {
  // useEffect(() => {
  //   const { azimuth, inclination } = building.sun;
  //   // Fake intersection with box calculation
  //   const x =
  //     1 * Math.cos(building.sun.azimuth) * (inclination > Math.PI / 2 ? -1 : 1);
  //   const y =
  //     1 * Math.sin(building.sun.azimuth) * (inclination > Math.PI / 2 ? -1 : 1);
  //   const z = 10 * Math.sin(building.sun.inclination);
  //   const normalized = [x, y, z];

  //   setSunPos([-normalized[0], normalized[2], normalized[1]]);
  // }, [building, setSunPos]);

  return (
    <>
      <div className="user-interface">
        <ControlsForm />
        <StackedBarChart />
      </div>
    </>
  );
};
