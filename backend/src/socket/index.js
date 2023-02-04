import jwtVerifier from '../Utils/utils'
import { Socket } from 'socket.io'

 export const configurePublicSocket = (server) => {
    const io = Socket(server, {
      cors: {
        origin: "*",
      },
    });
  
    return io;
  };