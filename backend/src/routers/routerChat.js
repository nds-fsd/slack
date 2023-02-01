import express from "express";
import Chat from "../Schemas/chat.js";
const routerChat = express.Router();
import { jwtMiddleware } from "../Middlewares/jwtMiddleware.js";

//Crear un chat asociado a un usuario y organización
routerChat.post("/createChat", jwtMiddleware, async (req, res) => {
  //Solo puedo crear un chat si he hecho login. En el key de token tengo el id de usuario

  //El id de organzación es necesario mandarlo con el body
  const idOrganizacion = req.body._id;

  console.log("idOrganizacion", idOrganizacion);

  //El middleware devuelve el jwtPayload con los datos del payload
  const idUser = req.jwtPayload.id;

  console.log("idUser", idUser);

  try {
    const chat = new Chat(req.body);

    console.log("Entidad Chat", chat);

    //La forma de asignar el idOrganización es mediante una equivalencia cuando son dependencias 1 a N (sin array en el schema de Chat)
    chat.organizacion = idOrganizacion;

    //Esta es la forma de añadir usuarios al chat cuando son equivalencias N a N
    chat.user.push(idUser);

    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Listar todos los chats
routerChat.get("/allChats", jwtMiddleware, async (req, res) => {
  try {
    const allChats = await Chat.find();
    res.status(200).json(allChats);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Añadir user al chat en el cual siempre ya hay mínimo un usuario añadido que es el que crea el chat
routerChat.patch("/addUserChat/:id", jwtMiddleware, async (req, res) => {
  const idNewUser = req.body._id;
  const idChat = req.params.id;

  try {
    const chatModified = await Chat.findById(idChat); //.populate('User');

    const idExist = await Chat.findOne({user: idNewUser}).populate('user');

    console.log('id Existe',idExist);

    if (chatModified) {
      chatModified.user.push(idNewUser);
      res.status(200).json(chatModified);
    } else {
      res.status(404).send("Chat no encontrado");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerChat;
