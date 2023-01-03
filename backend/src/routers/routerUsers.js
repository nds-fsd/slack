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

