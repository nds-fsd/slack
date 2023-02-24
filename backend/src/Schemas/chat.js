import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  organizacion: { type: Schema.ObjectId, ref: "Organizacion" },
  user: [{ type: Schema.ObjectId, ref: "User" }],
  
},{timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});

const Chat = model("Chat", chatSchema);

export default Chat;
