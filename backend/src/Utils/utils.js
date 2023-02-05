import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const generateJWT = (user) => {
  const payload = {
    id: user._id,
    userName: user.userName,
    name: user.name,
  };

  const token = jwt.sign(payload, secret, { expiresIn: 1 });

  return token;
};

export const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.id;
  } catch (error) {
    return null;
  }
};

export const jwtVerifier = (token,callback) => {
	jwt.verify(token, secret, callback);
}



