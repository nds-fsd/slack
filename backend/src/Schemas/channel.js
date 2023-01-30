import { Schema, model } from 'mongoose';


const channelSchema = new Schema({
    channelName: { type: String, required: true },
    isPrivate:{type:Boolean, requiered: true},
    user:[{type: Schema.ObjectId, ref: 'User'}]
    
  });

  const Channel = model('channel', channelSchema);
  export default Channel;
  