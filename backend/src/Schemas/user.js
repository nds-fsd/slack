import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    userName:  {type: String, required: true},
    name:  {type: String, required: true}, 
    email: {type: String, required: true, required: true, unique: true, trim: true},
    lastName:{type: String, required: true},
    password:{type: String, required: true}
});

const User = model('user', userSchema);

export default User;