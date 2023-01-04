import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    userName:  {type: String, required: true},
    name:  {type: String, required: true}, 
    email: {type: String, required: true},
    lastName:   String 
});

const User = model('user', userSchema);

export default User;