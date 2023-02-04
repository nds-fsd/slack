import mongoose, {model, Schema } from "mongoose";

const publicMessageSchema = new Schema({
    text: String,
    from: String,
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
    },
  })

const PublicMessage = model('PublicMessage', publicMessageSchema)


export default PublicMessage;