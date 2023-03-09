import express from "express";
import Messages from "../Schemas/message.js";
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';
const routerMessages = express.Router();
import {io} from '../index.js';
import Chat from "../Schemas/chat.js";
import Channel from "../Schemas/channel.js";
import Organizacion from "../Schemas/organizacion.js";


routerMessages.post('/message', jwtMiddleware, async (req, res) => {

  const idUser = req.jwtPayload.id;           //recogemos del payload del token el id y lo guardamos en una variable
  if (!req.body.text) return res.status(404).json({ message: "No hay mensaje" })
  

  const newMessage = new Messages({
    ...req.body,
    date: new Date(),
    user: idUser,
  });

  const messageCreate = await newMessage.save();
  io.to(req.body.chat? req.body.chat : req.body.channel).emit("reply", messageCreate);  
  const chatOrChannel = req.body.chat ? await Chat.findById(req.body.chat).populate("organizacion").populate("user").exec() : await Channel.findById(req.body.channel).populate("organizacion").populate("user").exec();
  const userReceived = chatOrChannel.user.map((e)=> e.id)
  console.log('usertoReceived',chatOrChannel)
  io.to(userReceived).emit("reply2", {
    
      organizacion: chatOrChannel.organizacion.OrgName,
      idOrganizacion: chatOrChannel.organizacion._id,
      chat: chatOrChannel,
      text: req.body.text,
      name: req.jwtPayload.name,
      userName: req.jwtPayload.userName,
      idUser: req.jwtPayload.id
    
  });
  return res.status(201).json(messageCreate)

});

routerMessages.get('/message', jwtMiddleware, async (req, res) => {
  try {
    const query = req.query;
    const allMessages = await Messages.find(query).populate({ //populamos lo mismo que en el metodo get por :id
      path: 'user',
    })
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json(error)
  }
});


routerMessages.get('/message/:id', jwtMiddleware, async (req, res) => {
  const messageFound = await Messages.findById(req.params.id).populate({//populamos la key user del schema message y user tambien tiene informacion que popular
    path: 'user',
    populate: { path: 'organizacion' }                                 //2do populate de organizacion que esta dentro de la key user 
  })
  if (messageFound) res.status(200).json(messageFound)
  else res.status(404).send('Mensaje no encontrado')
})



routerMessages.patch('/message/:id', jwtMiddleware, async (req, res) => { //el metodo post tiene detallado tambien los siguientes pasos son iguales.
  const date = new Date().toLocaleDateString();
  req.body.date = date
  const now = new Date()
  const hour = now.getHours()
  if (hour < 10) { hour = '0' + hour }
  let minutes = now.getMinutes()
  if (minutes < 10) { minutes = '0' + minutes }
  const hourComplete = `${hour}:${minutes}`
  req.body.hour = hourComplete
  try {
    if (!req.body.text) return res.status(404).send('Mensaje vacio')
    const messageUpdate = await Messages.findByIdAndUpdate(req.params.id, req.body);
    if (messageUpdate) {
      res.status(200).json(messageUpdate)
    } else {
      res.status(404).send('Mensaje no encontrado')
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

routerMessages.delete('/message/:id', jwtMiddleware, async (req, res)=>{
  try{
    const messageFound = await Messages.findByIdAndDelete(req.params.id)
    if(!messageFound)return res.status(404).send('Mensaje no encontrado')
    res.send('Mensaje Eliminado')
  }catch(error){
    res.status(500).json(error)
  }
  
})

export default routerMessages;