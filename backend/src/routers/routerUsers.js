import express from 'express';
import User from '../Schemas/user.js';
const routerUsers = express.Router();
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

routerUsers.get('/user',async(req,res)=>{
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
        }catch(error){
          res.status(500).json(error)
        }
      });

routerUsers.get('/user/:id', async (req,res)=>{
    const id = req.params.id
    try{
    const user = await User.findById(id)
    if (user){
        res.status(200).json(user)
    }else{
        res.status(404).send('No existe este usuario')
    }}catch(error){
        res.status(500).json(error)
    }
});

routerUsers.post('/user', async(req,res)=> {
    try{
        const body = req.body;
        const data = {
            userName: body.userName,
            email: body.email,
            name: body.name,
            lastName: body.lastName,
            password:body.password
        }

        //Validar que tengamos email
        if(!email) {
            return res.status(400).json({ error: { register: "Email not recieved"}});
        }

        //Validar que el mail no existe
        User.findOne({email})

        const user = new User(data);
        await user.save();
        await  ((createdUser =>{
            return res.status(201).json({
                token: createdUser.generateJWT(),
                user: {
                    userName:createdUser.userName,
                    email:createdUser.email,
                    lastName:createdUser.lastName,
                    id: createdUser._id,

                },
            })

        }))
        //res.status(201).send(user)
        }catch(error){
            res.status(500).json(error)
        }
    }
);

routerUsers.patch('/user/:id', async(req,res)=>{
    try{
        const userModified = await User.findByIdAndUpdate(req.params.id, req.body);
        if(userModified){
            res.status(200).json(userModified)
        }else{
            res.status(404).send('Usuario no encontrado')
        }
    }catch(error){
        res.status(500).json(error)
    }
});

routerUsers.delete('/user/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const userDelete = await User.findByIdAndDelete(id)
        res.status(204).send('Usuario eliminado')
    }catch(error){
        res.status(500).json(error)
    }
});

export default routerUsers;