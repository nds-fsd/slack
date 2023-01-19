import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'


const userSchema = new Schema({
    userName:  {type: String, required: true},
    name:  {type: String, required: true}, 
    email: {type: String, required: true, required: true, unique: true, trim: true},
    lastName:{type: String, required: true},
    password:{type: String, required: true, required: true, unique: true, trim: true}
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    this.password = hash
    next()
  })

const User = model('user', userSchema);

export default User;