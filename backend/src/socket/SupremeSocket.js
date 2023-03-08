import { Server } from "socket.io";
import { server } from "../index.js";
import { jwtVerifier } from "../Utils/utils.js";

// Creamos el servidor de socket

export const SupremeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      jwtVerifier(socket.handshake.auth.token, (err, user) => {
        if (err) return next(new Error("Authentication error"));
        socket.user = user;
        next();
      });
    }
  });

  // Manejamos los eventos de conexión de sockets

  io.on("connection", (socket) => {
    console.log(
      `User ${socket.user.name} has connected to socket ${socket.id}`
    );

    socket.emit("connected", "You are now connected");

    socket.join(socket.user._id);

    socket.on("join-room", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.user.name} has joined room ${chatId}`);
    });

    //Para emitir a todos menos al que envío el socket
    socket.on("notification", (data) => {
      console.log(data);
      socket.broadcast.emit("reply2", data);
    });

  });

  io.on("disconnect", (socket) => {
    console.log(`User ${socket.user.name} has disconnected`);
  });

  return io;
};
