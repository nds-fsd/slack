import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

let dbUrl = process.env.Mongo_URL;

export const connectDB = async() => {
    if (process.env.NODE_ENV === 'test') {
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
    }
  
    mongoose.set("strictQuery", false);
  
    try {
      await   mongoose.connect(dbUrl);
  
      const mongo = mongoose.connection;
      mongo.on("error", (error) => console.error(error));
      mongo.once("open", () => {
        console.log("connected to database, yuppy!");
      });
    }catch (e){
      console.log(e);
    }
}
  

  export const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
        }
    } catch (err) {
        console.log(err);
    }
};

