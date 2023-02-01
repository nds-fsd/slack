import express from "express";
import Chat from "../Schemas/chat.js";
const routerChat = express.Router();
import { jwtMiddleware } from "../Middlewares/jwtMiddleware.js";

//Crear un chat asociado a un usuario y organización
routerChat.post("/createChat", jwtMiddleware, async (req, res) => {
  //Solo puedo crear un chat si he hecho login. En el key de token tengo el id de usuario

  //El id de organzación y fecha es necesario mandarlo con el body
  const idOrganizacion = req.body.organizacion;
  const creationDate = req.body.creationDate;

  console.log("creationDate", creationDate);
  console.log("idOrganizacion", idOrganizacion);

  //El middleware devuelve el jwtPayload con los datos del payload
  const idUser = req.jwtPayload.id;

  console.log("idUser", idUser);

  try {
    const chat = new Chat(req.body);

    //La forma de asignar el idOrganización es mediante una equivalencia cuando son dependencias 1 a N (sin array en el schema de Chat)
    chat.organizacion = idOrganizacion;

    //Esta es la forma de añadir usuarios al chat cuando son equivalencias N a N
    chat.user.push(idUser);

    await chat.save();
    console.log("Entidad Chat", chat);
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

//Consultar solo un chat
routerChat.get("/chat/:idChat", jwtMiddleware, async (req, res) => {
    const idChat = req.params.idChat
    
    try {
      const chat = await Chat.findById(idChat);
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//Añadir user al chat en el cual siempre ya hay mínimo un usuario añadido que es el que crea el chat
routerChat.patch("/addUserChat/:idChat", jwtMiddleware, async (req, res) => {
  const idNewUser = req.body.user;
  const idChat = req.params.idChat;

  try {
    // comprobamos que el chat nos lo pasan por parametro de la url
    if (!idChat) return res.status(404).json("IdChat no existe");
    // si el chat existe lo buscamos en la base de datos y lo metemos en la variable chatModified
    const chatModified = await Chat.findById(idChat);

    console.log("chatModificado", chatModified);

    //Validar que el usuario no está registrado ya
    const existingUser = await Chat.findOne({ _id: idChat, user: idNewUser });

    if (existingUser)
      return res.status(404).json("El usuario ya existe en el chat");

    chatModified.user.push(idNewUser);

    await chatModified.save();

    res.status(200).json(chatModified);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Eliminar un chat al completo
routerChat.delete("/deleteChat/:idChat", jwtMiddleware, async (req, res) => {
  const idChat = req.params.idChat;

  try {
    const chatDelete = await Chat.findByIdAndDelete(idChat);
    res.status(204).json("Chat eliminado");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Eliminar un usuario del chat
routerChat.patch("/deleteUserFromChat/:idChat", jwtMiddleware, async (req, res) => {
    const idUserToDelete = req.body.user;
    const idChat = req.params.idChat;

    console.log('userToDelete',idUserToDelete)

    try {
      // comprobamos que el chat nos lo pasan por parametro de la url
      if (!idChat) return res.status(404).json("IdChat no existe");
      // si el chat existe lo buscamos en la base de datos y lo metemos en la variable chatModified
      const chatModified = await Chat.findById(idChat);

      console.log("chatModificado", chatModified);
    
      //Buscar el usuario
      const existingUser = await Chat.findOne({_id: idChat, user: idUserToDelete});

      console.log('existinUser', existingUser);

      //Validar que el usuario está en el chat
      if (!existingUser) return res.status(404).json("El usuario no existe en el chat");

      //Eliminar el usuario
      const eliminateUser = await Chat.findOneAndDelete({_id: idChat, user: idUserToDelete});

      console.log('chat ultimo', eliminateUser)
      
      await eliminateUser.save();

      res.status(200).json(eliminateUser);

    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default routerChat;
