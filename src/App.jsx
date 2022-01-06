import { BuildingContextProvider } from "./context/BuildingContext";
import { SocketContextProvider } from "./context/SocketContext";
import { Builder } from "./components/Builder";
import { WorldCanvas } from "./components/WorldCanvas";

export const App = () => {
  return (
    <BuildingContextProvider>
      <SocketContextProvider>
        <Builder />
        <WorldCanvas />
      </SocketContextProvider>
    </BuildingContextProvider>
  );
};
