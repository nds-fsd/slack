import jwtVerifier from "../Utils/utils.js";
//import {socketio} from "socket.io";
//const socketio = require("socket.io");
import * as socketio from "socket.io"

const configurePublicSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  return io;
};

export default configurePublicSocket