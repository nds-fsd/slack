import mongoose, {  model, Schema } from "mongoose";

const messageSchema = new Schema({
    date: {type: Date, required: true},
    text: {type: String, required: true},
    user:{type: Schema.ObjectId, ref: 'User'},
    chat:{type: Schema.ObjectId, ref: 'Chat'},
    channel:{type: Schema.ObjectId, ref: 'Channel'},
})

const Message = model('Message', messageSchema)


export default Message;