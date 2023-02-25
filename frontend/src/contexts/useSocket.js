import { createContext,useState, useContext, useMemo } from "react";
import io from "socket.io-client";
import { getUserToken } from "../utils/localStorageUtils";
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  
  //const [showNewMessage, setShowNewMessage] = useState(false);
  const [alert, setAlert] = useState(false)

  const socket = useMemo(() => {
    const token = getUserToken();

    return io(
      window.location.hostname === "skuadlack.netlify.app"
        ? "https://skuadlack.up.railway.app"
        : "http://localhost:3001",
      {
        reconnectionDelayMax: 10000,
        auth: {
          token,
        },
      }
    );
  }, []);

  const joinChat = (chatId) => {
    socket.emit("join-room", chatId);
    /*
    setShowNewMessage(true);
    
    setTimeout(() => {
      setShowNewMessage(false);
    }, [5000]);
    */
  };

  const onMessageReceived = (callback) => {
    socket.on("message", callback);
    setAlert(true)
        
    
  };

  return (
    <SocketContext.Provider
      value={{ joinChat, socket, onMessageReceived, setAlert, alert}}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
