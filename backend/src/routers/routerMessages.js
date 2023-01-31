import express from "express";
import Messages from "../Schemas/message.js";
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';
const routerMessages = express.Router();


routerMessages.post('/message', jwtMiddleware, async (req,res) =>{
    const date = new Date().toLocaleDateString();
    req.body.date = date
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes() 
    const hourComplete = `${hour}:${minutes}`
    req.body.hour = hourComplete
    const idUser = req.jwtPayload.id;
    req.body.user = idUser; 
    if (!req.body.text) return res.status(404).json({message: "No hay mensaje" })
    if (!req.body.user) return res.status(404).json({message: "No hay usuario" })
    const newMessage =  new Messages(req.body);
    
    const messageCreate = await newMessage.save();
    return res.status(201).json(messageCreate)

});

// routerMessages.get('/chat', jwtMiddleware, async (req,res) =>{

// });

export default routerMessages;

routerMessages.get('/message',async(req,res)=>{
    try{
        const allMessages = await Messages.find().populate('user');
        res.status(200).json(allMessages);
        }catch(error){
          res.status(500).json(error)
        }
});