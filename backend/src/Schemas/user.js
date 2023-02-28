import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const secret = process.env.JWT_SECRET;
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';



const userSchema = new Schema({
  userName: { type: String, required: true, unique:true },
  name: { type: String, required: true },
  email: { type: String, required: true, required: true, unique: true, trim: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
  lastName: { type: String, required: true },
  password: { type: String, required: true, required: true, unique: true, trim: true },
  role:{type: String, enum:['GLOBAL_ADMIN', 'USER'], default:'USER'}
  
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  this.password = hash
  next()
})


userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//ESTE METODO DE GENERATEJWT no se usa, estamos usando la funcion directa del utils

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
  };
  // * This method is from the json-web-token library (who is in charge to generate the JWT
  return jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};

const User = model('User', userSchema);

export default User;