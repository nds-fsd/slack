import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './Mongo/index.js';
import routerUsers from './routers/routerUsers.js';
import routerOrg from './routers/routerOrg.js';
import routerChat from './routers/routerChat.js';
import routerMessages from './routers/routerMessages.js';
import routerPublicMessage from './routers/routerPublicMessage.js';
import { SupremeSocket } from './socket/SupremeSocket.js';
import routerChannel from './routers/routerChannel.js';

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
app.use(routerChannel);
// SupremeSocket();

let port = process.env.PORT ?? 8080;

if(process.env.NODE_ENV !== 'test'){
    connectDB().then((error) => {
        if(error){
            console.log(error);
        }else{
            console.log('🏢 Connected to database!');
        }
    });
}else{
    port = process.env.TEST_PORT
}
export const server = app.listen(port, () => {
    console.log('Server started! ⚡')
})

export const io = SupremeSocket(server)


