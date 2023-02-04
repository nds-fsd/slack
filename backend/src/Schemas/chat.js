import { Schema, model } from "mongoose";

//se define el esque para que el modelo de fecha sea dd-mm-yyyy
/*
const chatSchema = new Schema({
    creationDate: { type: Date,
        required: true,
        get: value => {
            const date = new Date(value);
            return `${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
        },
        set: value => {
            const dateParts = value.split("-");
            return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          }
        },
    organizacion: [{type: Schema.ObjectId, ref: 'Organizacion'}],
    user: [{type: Schema.ObjectId, ref: 'User'}]
  });
  */

const chatSchema = new Schema({
  organizacion: { type: Schema.ObjectId, ref: "Organizacion" },
  user: [{ type: Schema.ObjectId, ref: "User" }],
  
},{timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});

const Chat = model("Chat", chatSchema);

export default Chat;
