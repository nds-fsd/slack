import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET; 

const generateJWT = (user) =>{
    const payload = {
        id:user._id,
        userName:user.userName,
        name:user.name
    }
    
    const token = jwt.sign(payload, secret, {expiresIn: 1})

    return token

}

export default generateJWT