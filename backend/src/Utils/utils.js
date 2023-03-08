import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
const generateJWT = (user) => {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);
  const payload = {
    id: user._id,
    userName: user.userName,
    name: user.name,
    role: user.role
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });

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
	jwt.verify(token, secret, callback);
}


export {generateJWT, getUserIdFromToken, jwtVerifier};
