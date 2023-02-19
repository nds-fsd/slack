import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './Mongo/index.js';
import routerUsers from './routers/routerUsers.js';
import routerOrg from './routers/routerOrg.js';
import routerChat from './routers/routerChat.js';
import routerMessages from './routers/routerMessages.js';
import routerPublicMessage from './routers/routerPublicMessage.js';
import { configurePublicSocket } from './socket/index.js';
import { Server } from 'socket.io';





dotenv.config();
export const app = express();
// const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerOrg);
app.use(routerChat);
app.use(routerMessages);
app.use(routerPublicMessage);


let port

if(process.env.NODE_ENV !== 'test'){
    connectDB()
   port = process.env.PORT ?? 8080;
}else{
    port = process.env.TEST_PORT
}

export const server = app.listen(port, () => {

console.log(`Server is up and running at port ${port} ⚡`)


if(process.env.NODE_ENV !== 'test'){
    connectDB().then((error) => {
        if(error){
            console.log(error);
        }else{
            console.log('Connected to database! MONGO ATLAS');
        }
    });
}

})


export const socketIoPublic = configurePublicSocket(server);



