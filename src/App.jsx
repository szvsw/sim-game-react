import { Builder } from "./components/Builder";
import io from "socket.io-client";
import { useEffect, useState } from "react";

export const App = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  return <Builder socket={socket} />;
};
