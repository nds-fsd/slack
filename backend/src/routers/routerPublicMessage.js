import express from "express";
import PublicMessage from "../Schemas/public-message.js";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware.js";
import socketServer from "../index";
const routerPublicMessages = express.Router();

routerPublicMessages.post("/createPublicMessage", async (req, res) => {
  const { text, from } = req.body;
  const newMessage = new PublicMessage({ text, from });

  newMessage.save((error, messageStored) => {
    if (error || !messageStored) {
      return res.status(404).json({
        status: "error",
        message: "Error saving the message",
      });
    }

    // despues de crear el mensaje de manera exitosa,
    // le decimos al socket que emita un evento
    socketServer.io.emit("NEW_MESSAGE", newMessage);
    
    return res.status(200).json({
      status: "success",
      messageStored,
    });
  });
});

routerPublicMessages.get("/getPublicMessage", async (req, res) => {
  //buscamos los mensajes y los ordenamos a los mas nuevos primero
  const query = PublicMessage.find({}).sort({ created_at: -1 });

  query.exec((error, messages) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al extraer los datos",
      });
    }

    //Si no existen mensajes:
    if (!messages) {
      return res.status(404).json({
        status: "error",
        message: "No hay mensajes para mostrar",
      });
    }

    return res.status(200).json({
      status: "success",
      messages,
    });
  })

});

export default routerPublicMessages