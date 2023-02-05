import { jwtVerifier } from "../Utils/utils.js";
import { Server } from "socket.io";

export const configurePublicSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  return io;
};