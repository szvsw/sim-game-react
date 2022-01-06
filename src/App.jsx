import { BuildingContextProvider } from "./context/BuildingContext";
import { SocketContextProvider } from "./context/SocketContext";
import { Dashboard } from "./components/Dashboard";
import { WorldCanvas } from "./components/WorldCanvas";

export const App = () => {
  return (
    <BuildingContextProvider>
      <SocketContextProvider>
        <Dashboard />
        <WorldCanvas />
      </SocketContextProvider>
    </BuildingContextProvider>
  );
};
