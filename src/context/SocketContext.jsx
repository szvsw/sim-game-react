import { useContext, useCallback, useState, useEffect, createContext } from "react";
import io from "socket.io-client";
import { BuildingContext } from "./BuildingContext";

export const SocketContext = createContext({ socket: null });

export const SocketContextProvider = ({ children }) => {
  const { setBuilding } = useContext(BuildingContext);
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

  const triggerCostCalculation = useCallback(
    (_building) => {
      if (socket) {
        console.log("triggering calculation immediately");
        socket.emit("update cost", _building);
      }
    },
    [socket]
  );

  const emitBuildingChange = useCallback(
    (_building) => {
      if (socket) {
        setServerIsComputingCost(true);
        socket.emit("building", _building);
      }
    },
    [socket, setServerIsComputingCost]
  );

  const computeNewSunPos = useCallback(
    (_building) => {
      if (socket) {
        const sun = _building.sun;
        socket.emit("sun-weather", sun);
      }
    },
    [socket]
  );

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  //TODO: remove event listeners when unmounted

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
        const newSunPos = [-data.results.V[0], data.results.V[2], data.results.V[1]];
        setSunPos(newSunPos);
      });

      socket.on("cost-calculator", (data) => {
        const newCost = data.results.cost;
        setCost(newCost);
        setServerIsComputingCost(false);
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
    triggerCostCalculation,
    emitBuildingChange,
    computeNewSunPos,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
