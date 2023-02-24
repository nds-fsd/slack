import { Server } from 'socket.io';
import {server} from '../index.js'
import { jwtVerifier } from '../Utils/utils.js';

// Creamos el servidor de socket

export const SupremeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.use((socket, next) => {
        if(socket.handshake.auth && socket.handshake.auth.token) {
            jwtVerifier(socket.handshake.auth.token, (err, user) => {
                if(err) return next(new Error('Authentication error'));
                socket.user = user;
                next();
            })
        }
    })

    // Manejamos los eventos de conexión de sockets

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.name} has connected to socket ${socket.id}`)

        socket.emit("connected", "You are now connected");
        socket.on("join-room", (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.user.name} has joined room ${chatId}`)
        });

        // // Manejamos el evento "chat", que se dispara cuando un usuario envía un mensaje

        // socket.on('chat', (data) => {
        //     console.log('eto e un DATA', data);
        //     // Enviamos el mensaje a todos los sockets que estén en la misma sala (room)

        //     socket.to(data.room).emit('reply', {
        //         from: data.from,
        //         message: data.message,
        //         room: data.room

        //     })
        // })

        // // Manejamos el evento "joinRoom", que se dispara cuando un usuario se une a una sala
        // socket.on('leave', (data) => {
        //     console.log(`El cliente ${socket.id} ha abandonado la sala ${data}`);
        //     socket.leave(data);
        // });

        // socket.on('joinRoom', (data) => {
        //     console.log(`El cliente ${socket.id} ha entrado la sala ${data}`);
        //     socket.join(data)

        // })
    })

    io.on('disconnect', (socket) => {

        console.log(`User ${socket.user.name} has disconnected`);
    })

    return io;

};