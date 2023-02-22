import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);

// Creamos el servidor de socket

export const SupremeSocket = () => {
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

// Manejamos los eventos de conexión de sockets

    io.on('connection', (socket) => {
        console.log('Usuario conectado al socket: ' + socket.id)

// El usuario se une al canal "public" al conectarse

        socket.join('public')

// Emitimos un mensaje a todos los usuarios cuando alguien se conecta

        io.emit('userConect',{
            from:'server',
            message:'Usuario conectado',
            room:'public'
        })

        
// Manejamos el evento "chat", que se dispara cuando un usuario envía un mensaje

        socket.on('chat', (data)=>{
                console.log('eto e un DATA',data);
                // Enviamos el mensaje a todos los sockets que estén en la misma sala (room)

            socket.to(data.room).emit('reply',{
                from: data.from,
                message: data.message,
            
            })
        })

// Manejamos el evento "joinRoom", que se dispara cuando un usuario se une a una sala

        socket.on('joinRoom',(data)=>{
            console.log('joinroom data', data);
            socket.join(data)

        })
    })

    io.on('disconnect',()=>{
        console.log('usuario desconectado');
    })

    server.listen(8081,()=>{
        console.log('socket on en 8081!');
    })
  };