import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const secret = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken'



const userSchema = new Schema({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, required: true, unique: true, trim: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
  lastName: { type: String, required: true },
  password: { type: String, required: true, required: true, unique: true, trim: true },
  organizacion: [{type: Schema.ObjectId, ref: 'Organizacion'}]
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

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.firstName,
    email: this.email,
  };
  // * This method is from the json-web-token library (who is in charge to generate the JWT
  return jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};

const User = model('User', userSchema);

export default User;