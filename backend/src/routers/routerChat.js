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
    chat.organizacion = idOrganizacion
    
    //Esta es la forma de añadir usuarios al chat cuando son equivalencias N a N
    chat.user.push(idUser);
  
    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerChat;
