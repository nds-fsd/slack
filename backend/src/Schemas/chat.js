import { Schema, model } from 'mongoose';


const chatSchema = new Schema({
    creationDate: { type: Date, required: true },
    organizacion: [{type: Schema.ObjectId, ref: 'Organizacion'}],
    user: [{type: Schema.ObjectId, ref: 'User'}]
  });

  const Chat = model('chat', userSchema);

export default Chat;