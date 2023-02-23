import { createContext, useContext, useMemo } from "react";
import io from 'socket.io-client';
import { getUserToken } from "../utils/localStorageUtils";
const SocketContext = createContext();


export const SocketContextProvider = ({children}) => {

    const socket =  useMemo(() => {
        const token = getUserToken();

        return io(window.location.hostname === "skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001", 
                    {
                        reconnectionDelayMax: 10000,
                        auth: {
                            token
                        }
                    }
                )
    }, []);


    const joinChat = (chatId) => {
        socket.emit("join-room", chatId)
    }

    const onMessageReceived = (callback) => {
        socket.on("message", callback);
    }

    return (<SocketContext.Provider value={{joinChat, socket, onMessageReceived}}>
        {children}
    </SocketContext.Provider>)

};


export const useSocket = () => useContext(SocketContext);