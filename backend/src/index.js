import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './Mongo/index.js';
import routerUsers from './routers/routerUsers.js';
import routerOrg from './routers/routerOrg.js';




dotenv.config();
export const app = express();
// const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerOrg)

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
    console.log(`Server is up and running at port ${port} ⚡`)
})

// module.exports = {app, server};
