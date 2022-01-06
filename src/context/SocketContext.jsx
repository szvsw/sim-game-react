import {
  useContext,
  useCallback,
  useState,
  useEffect,
  createContext,
} from "react";
import io from "socket.io-client";
import { BuildingContext } from "./BuildingContext";

export const SocketContext = createContext({ socket: null });

export const SocketContextProvider = ({ children }) => {
  const { building, setBuilding } = useContext(BuildingContext);
  const [socket, setSocket] = useState(null);

  const [serverIsComputingCost, setServerIsComputingCost] = useState(true);
  const [serverIsComputingEui, setServerIsComputingEui] = useState(false);

  const [sunPos, setSunPos] = useState([0, 50, 0]);
  const [cost, setCost] = useState(null);
  const [eui, setEui] = useState("No results calculated yet.");
  const [results, setResults] = useState(null);

  // Todo: rename, make it emit building (currently assumes state persistence)
  const submitBuildingData = useCallback(() => {
    if (socket) socket.emit("compute eui", 1);
    setServerIsComputingEui(true);
  }, [setServerIsComputingEui, socket]);

  const emitBuildingChange = useCallback(() => {
    if (socket) {
      socket.emit("building", building);
      setServerIsComputingCost(true);
    }
  }, [socket, building, setServerIsComputingCost]);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("building", (data) => {
        setBuilding(data);
      });

      socket.on("eui", (data) => {
        setEui(data);
        setServerIsComputingEui(false);
      });

      socket.on("results", (data) => {
        setResults(data);
      });

      socket.on("cost", (data) => {
        setCost(data);
        setServerIsComputingCost(false);
      });

      socket.on("sun-weather", (data) => {
        const newSunPos = [
          -data.results.V[0],
          data.results.V[2],
          data.results.V[1],
        ];
        setSunPos(newSunPos);
      });
    }
  }, [
    socket,
    setBuilding,
    setCost,
    setServerIsComputingCost,
    setEui,
    setServerIsComputingEui,
    setResults,
    setSunPos,
  ]);

  const value = {
    socket,
    serverIsComputingCost,
    setServerIsComputingCost,
    serverIsComputingEui,
    setServerIsComputingEui,
    eui,
    setEui,
    results,
    setResults,
    cost,
    setCost,
    sunPos,
    setSunPos,
    submitBuildingData,
    emitBuildingChange,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
