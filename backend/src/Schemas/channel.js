import { Schema, model } from "mongoose";

const channelSchema = new Schema({
    name: { type: String, required: true },
    description: {type: String},
    organizacion: { type: Schema.ObjectId, ref: "Organizacion" },
    user: [{ type: Schema.ObjectId, ref: "User" }],

}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Channel = model("Channel", channelSchema);

export default Channel;
