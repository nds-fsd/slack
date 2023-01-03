const express = require('express');
const { default: User } = require('../Schemas/user');
const userRouter = express.Router();


userRouter.get('/user/:id', async (req,res)=>{
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

userRouter.post('/user', async(req,res)=> {
    try{
    const body = req.body;
    const data = {
        userName: body.username,
        email: body.email,
        name: body.name,
        lastName: body.lastname
    }
    const user = new User(data);
    await user.save();
    res.status(201).json(user)
}catch(error){
    res.status(500).json(error)
}
});

userRouter.patch('/user/:id', async(req,res)=>{
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

userRouter.delete('/user/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const userDelete = await User.findByIdAndDelete(id)
        res.status(204).send('Usuario eliminado')
    }catch(error){
        res.status(500).json(error)
    }
});