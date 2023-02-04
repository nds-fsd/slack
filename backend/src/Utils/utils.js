import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const generateJWT = (user) => {
  const payload = {
    id: user._id,
    userName: user.userName,
    name: user.name,
  };

  const token = jwt.sign(payload, secret, { expiresIn: 1 });

  return token;
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.id;
  } catch (error) {
    return null;
  }
};

const jwtVerifier = (token,callback) => {
	jwt.verify(token, jwtSecret, callback);
}


export default {generateJWT, getUserIdFromToken, jwtVerifier};
