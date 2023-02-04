import mongoose, {model, Schema } from "mongoose";

const publicMessageSchema = new Schema({
    texto: String,
    from: String,
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
    },
  })

const PublicMessage = model('Message', publicMessageSchema)


export default Message;