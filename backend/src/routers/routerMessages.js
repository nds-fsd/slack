import express from "express";
import Messages from "../Schemas/message.js";
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';
const routerMessages = express.Router();


routerMessages.post('/message', jwtMiddleware, async (req, res) => {
  const date = new Date().toLocaleDateString();
  req.body.date = date
  const now = new Date()
  const hour = now.getHours()
  if (hour < 10) { hour = '0' + hour }
  let minutes = now.getMinutes()
  if (minutes < 10) { minutes = '0' + minutes }
  const hourComplete = `${hour}:${minutes}`
  req.body.hour = hourComplete
  const idUser = req.jwtPayload.id;
  req.body.user = idUser;
  if (!req.body.text) return res.status(404).json({ message: "No hay mensaje" })
  if (!req.body.user) return res.status(404).json({ message: "No hay usuario" })
  const newMessage = new Messages(req.body);

  const messageCreate = await newMessage.save();
  return res.status(201).json(messageCreate)

});

routerMessages.get('/message/:id', jwtMiddleware, async (req, res) => {
  const messageFound = await Messages.findById(req.params.id).populate({
    path: 'user',
    populate: { path: 'organizacion' }
  })
  if (messageFound) res.status(200).json(messageFound)
  else res.status(404).send('Mensaje no encontrado')
})

routerMessages.get('/message', jwtMiddleware, async (req, res) => {
  try {
    const allMessages = await Messages.find().populate({
      path: 'user',
      populate: { path: 'organizacion' }
    })
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json(error)
  }
});


routerMessages.patch('/message/:id', jwtMiddleware, async (req, res) => {
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