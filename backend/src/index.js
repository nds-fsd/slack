import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongo from './Mongo/index.js';
import routerUsers from './routers/routerUsers.js';
import routerOrg from './routers/routerOrg.js';
import routerChat from './routers/routerChat.js';
import routerMessages from './routers/routerMessages.js';
import routerPublicMessage from './routers/routerPublicMessage.js';
import { configurePublicSocket } from './socket/index.js';
import { Server } from 'socket.io';
import { sendMailWelcome } from './sendgrid/index.js';





dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerOrg);
app.use(routerChat);
app.use(routerMessages);
app.use(routerPublicMessage);

app.get('/sendmail', (req, res)=>{
sendMailWelcome()
return res.status(200).send()
})


const server = app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})

export const socketIoPublic = configurePublicSocket(server);



