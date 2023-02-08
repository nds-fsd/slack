import express from "express";
import Messages from "../Schemas/message.js";
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';
const routerMessages = express.Router();


routerMessages.post('/message', jwtMiddleware, async (req, res) => {
  const date = new Date().toLocaleDateString();//guardamos en una variable la fecha y la hacemos fecha local y la stringeamos
  req.body.date = date                         //forzamos la key date del body con la variable date
  let now = new Date()                       //guardamos en una variable la fecha
  const hour = now.getHours()                  //recurrimos a .getHours() un metodo de Date que te da el digito de la hora y lo guardamos en una variable
  if (hour < 10) { hour = '0' + hour }         //si es menor de 10 ese digito le concatenamos un 0 delante para que ej=> las 04 en vez de las 4.
  let minutes = now.getMinutes()               //recurrimos a .getMinutes() un metodo de Date que te da el digito de los minutos y lo guardamos en una variable
  if (minutes < 10) { minutes = '0' + minutes }//si es menor de 10 ese digito le concatenamos un 0 delante para que ej=> sean 04 minutos en vez de 4.
  const hourComplete = `${hour}:${minutes}`   //guardamos en una variable el formato que imprimimos ej=> 20:09
  req.body.hour = hourComplete                //forzamos la key hour del body con la variable hourComplete
  const idUser = req.jwtPayload.id;           //recogemos del payload del token el id y lo guardamos en una variable
  req.body.user = idUser;                     //forzamos la key user del body con la variable que acabamos de guardar con el id de usuario del token del payload.
  if (!req.body.text) return res.status(404).json({ message: "No hay mensaje" })
  if (!req.body.user) return res.status(404).json({ message: "No hay usuario" })
  const newMessage = new Messages(req.body);

  const messageCreate = await newMessage.save();
  return res.status(201).json(messageCreate)

});

routerMessages.get('/message/:id', jwtMiddleware, async (req, res) => {
  const messageFound = await Messages.findById(req.params.id).populate({//populamos la key user del schema message y user tambien tiene informacion que popular
    path: 'user',
    populate: { path: 'organizacion' }                                 //2do populate de organizacion que esta dentro de la key user 
  })
  if (messageFound) res.status(200).json(messageFound)
  else res.status(404).send('Mensaje no encontrado')
})

routerMessages.get('/message', jwtMiddleware, async (req, res) => {
  try {
    const allMessages = await Messages.find().populate({ //populamos lo mismo que en el metodo get por :id
      path: 'user',
      populate: { path: 'organizacion' }
    })
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json(error)
  }
});


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