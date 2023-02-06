import {  model, Schema } from "mongoose";


const PublicMessageSchema = new Schema(
  {
    text: String,
    from: String,
    hour: String
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
    },
  }
);

const PublicMessage = model("PublicMessage", PublicMessageSchema);

export default PublicMessage;;
