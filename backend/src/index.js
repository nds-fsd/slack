import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongo from './Mongo/index.js';
import routerUsers from './routers/routerUsers.js';
import routerOrg from './routers/routerOrg.js';
import routerChat from './routers/routerChat.js';
import routerMessages from './routers/routerMessages.js';
import configurePublicSocket from './socket/index.js';
import bodyParser from 'body-parser'



dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerOrg)
app.use(routerChat)
app.use(routerMessages)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})
*/

//He duplicado para generar la variable server y no romper nada de lo anterior, por las dudas
export const server = app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})

export const io = configurePublicSocket(server)