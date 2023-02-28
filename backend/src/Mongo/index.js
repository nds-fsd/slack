import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../Schemas/user.js';

dotenv.config();

let dbUrl = process.env.MONGO_URL;

let mongod;
export const connectDB = async() => {
    if (process.env.NODE_ENV === 'test') {
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
    }
  
    mongoose.set("strictQuery", false);
  
    try {
      await   mongoose.connect(dbUrl);

      const admin = await User.findOne({ role: "GLOBAL_ADMIN" });
      if (!admin) {
          console.log('💿 [DATABASE] ADMIN user not found, creating one....');

          const admin = new User({
              email: 'admin@skuadlack.com',
              password: 'nuclioskuadlack',
              name: "Admin",
              userName: "Admin",
              lastName: "Global",
              role: "GLOBAL_ADMIN"
          });

          await admin.save();
          console.log("💿 [DATABASE] ADMIN user created!: ", admin.email);
      } else {
          console.log("💿 [DATABASE] ADMIN user exists: ", admin.email);
      }
  
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

