import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongo from './Mongo/index.js';
import routerUsers from './routers/routerUsers.js';
import routerOrg from './routers/routerOrg.js';
import routerChannel from './routers/routerChannel.js';




dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerOrg)
app.use(routerChannel)

app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})
