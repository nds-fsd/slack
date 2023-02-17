import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);

export const SupremeSocket = () => {
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on('connection', (socket) => {
        console.log('Usuario conectado al socket' + socket.id)

        socket.join('public')

        io.emit('userConect',{
            from:'server',
            message:'Usuario conectado',
            server:'public'
        })
        socket.on('chat', (data)=>{
            socket.to(data.roomId).emit('reply',{
                from: socket.id,
                message: data.message,
                server: data.room,
                roomId: data.roomId
            })
        })
        socket.on('joinRoom',(data)=>{
            socket.leave(data.previousRoom)
            console.log(`Usuario id: ${socket.id} en la room: ${data.room}`)
            socket.join(data.room)
        })
    })

    io.on('disconnect',()=>{
        console.log('usuario desconectado');
    })

    server.listen(8081,()=>{
        console.log('socket on en 8081!');
    })
  };