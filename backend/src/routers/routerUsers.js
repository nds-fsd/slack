import express from 'express';
import User from '../Schemas/user.js';
import { validateUserName } from '../Middlewares/userName.js';
const routerUsers = express.Router();
import generateJWT from '../Utils/utils.js';
const jwtSecret = process.env.JWT_SECRET;
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';
import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken';

routerUsers.get('/user',jwtMiddleware, async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json(error)
    }
});

routerUsers.get('/user/:id',jwtMiddleware, async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).send('No existe este usuario')
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

// app.use(validateUserName);

routerUsers.post('/user', validateUserName,jwtMiddleware, async (req, res) => {
    try {

        const emailExist = await User.findOne({ email: req.body.email })
        const userNameExist = await User.findOne({ email: req.body.userName })

        if (!req.body.email) return res.status(404).json({ message: "No hay email" }) // Validar que viene un mail en el body

        if (emailExist) return res.status(400).json({ message: "El email ya existe" }) // Comprobar que el mail no existe
        if (userNameExist) return res.status(400).json({ message: "El nombre de usuario ya existe" }) // Comprobar que el userName no existe

        const user = new User(req.body)

        //antes de grabarse se ejecuta la función PRE del schema
        const userCreated = await user.save();

        const userToken = generateJWT(userCreated);

        //Crearmos otro objeto para no enviar la contraseña
        const resUser = {
            userName: userCreated.userName,
            _id:userCreated._id,
            email: userCreated.email,
            name: userCreated.name,
            lastName: userCreated.lastName
        }

        return res.status(201).json({ resUser, userToken })

    } catch (e) { return res.status(500).json({ message: `el error es ${e}` }) }
});

routerUsers.post('/register', validateUserName, async (req, res) => {
    try {

        const emailExist = await User.findOne({ email: req.body.email })
        const userNameExist = await User.findOne({ email: req.body.userName })

        if (!req.body.email) return res.status(404).json({ message: "No hay email" }) // Validar que viene un mail en el body

        if (emailExist) return res.status(400).json({ message: "El email ya existe" }) // Comprobar que el mail no existe
        if (userNameExist) return res.status(400).json({ message: "El nombre de usuario ya existe" }) // Comprobar que el userName no existe

        const user = new User(req.body)

        //antes de grabarse se ejecuta la función PRE del schema
        const userCreated = await user.save();

        const userToken = generateJWT(userCreated);

        //Crearmos otro objeto para no enviar la contraseña
        const resUser = {
            userName: userCreated.userName,
            _id:userCreated._id,
            email: userCreated.email,
            name: userCreated.name,
            lastName: userCreated.lastName
        }

        return res.status(201).json({ resUser, userToken })

    } catch (e) { return res.status(500).json({ message: `el error es ${e}` }) }
});

routerUsers.post('/login', async (req,res) => {
    const { email, password } = req.body
    // * Validate, email and password were provided in the request
    if ( !email || !password) {
        return res.status(400).json( { error: { login: "Missing email or password"}})
    }
    User.findOne({ email })
    .then((foundUser) => {
        // * Validate user email is already registered
        if (!foundUser) {
            return res.status(400).json( { error: { email: "User not found, please Register"}})
        }
        // * Validate password with bcrypt library
         if (!foundUser.comparePassword(password)) {
       // if (foundUser.password !== password) {
            return res.status(400).json( { error: { password: "Invalid Password"}})
        }
        // * if everything is ok, return the new token and user data
        return res.status(200).json({
            token: foundUser.generateJWT(), 
            user: {
                 email: foundUser.email,
                 name: foundUser.name,
                 id: foundUser._id,
            },
        })
    })
    .catch((err) => {
        return res.status(500).json( { error: { register: "Error Login in :(", error: err.message}})
    })
})

routerUsers.patch('/user/:id', validateUserName,jwtMiddleware, async (req, res) => {
    try {
        const userModified = await User.findByIdAndUpdate(req.params.id, req.body);
        if (userModified) {
            res.status(200).json(userModified)
        } else {
            res.status(404).send('Usuario no encontrado')
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

routerUsers.delete('/user/:id',jwtMiddleware, async (req, res) => {
    const id = req.params.id
    try {
        const userDelete = await User.findByIdAndDelete(id)
        res.status(204).send('Usuario eliminado')
    } catch (error) {
        res.status(500).json(error)
    }
});

export default routerUsers;