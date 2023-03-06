import express from "express";
import Chat from "../Schemas/chat.js";
import User from "../Schemas/user.js";
import Message from "../Schemas/message.js";
const routerChannel = express.Router();
import { jwtMiddleware } from "../Middlewares/jwtMiddleware.js";
import Channel from "../Schemas/channel.js";


routerChannel.post("/createChannel", jwtMiddleware, async (req, res) => {
    const idOrganizacion = req.body.organizacion;
    const idUser = req.jwtPayload.id;

    try {
        const channel = new Channel(req.body);
        channel.organizacion = idOrganizacion;
        channel.user.push(idUser);
        await channel.save();
        res.status(201).json(channel);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Crear un chat asociado a un usuario o VARIOS y organización
routerChannel.post("/createChannelById", jwtMiddleware, async (req, res) => {
    const idOrganizacion = req.body.organizacion;
    const idUser = req.body.idUser;

    try {
        const channel = new Channel(req.body);
        channel.organizacion = idOrganizacion;
        if (Array.isArray(idUser)) {
            idUser.map((e) => {
                channel.user.push(e)
            })
        } else {
            channel.user.push(idUser);
        }
        await channel.save();

        res.status(201).json(channel);
    } catch (error) {
        res.status(500).json(error);
    }
});

routerChannel.get("/allChannels", jwtMiddleware, async (req, res) => {
    try {
        const allChannels = await Channel.find().populate('user');
        res.status(200).json(allChannels);
    } catch (error) {
        res.status(500).json(error);
    }
});


routerChannel.get("/channel/:idChannel", jwtMiddleware, async (req, res) => {
    const idChannel = req.params.idChannel;

    try {
        const channel = await Channel.findById(idChannel).populate('user');
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json(error);
    }
});


routerChannel.patch("/addUserChannel/:idChannel", jwtMiddleware, async (req, res) => {
    const idNewUser = req.body.user;
    const idChannel = req.params.idChannel;

    try {
        if (!idChannel) return res.status(404).json("IdChat no existe");
        const channelModified = await Channel.findById(idChannel);
        const existingUser = await Channel.findOne({ _id: idChannel, user: idNewUser });
        if (existingUser)
            return res.status(404).json("El usuario ya existe en el channel");
        channelModified.user.push(idNewUser);
        await channelModified.save();
        res.status(200).json(channelModified);
    } catch (error) {
        res.status(500).json(error);
    }
});

routerChannel.delete("/deleteChannel/:idChannel", jwtMiddleware, async (req, res) => {
    const idChannel = req.params.idChannel;


    try {
        const messageDeletes = await Message.deleteMany({ channel: idChannel })
        const channelDelete = await Channel.findByIdAndDelete(idChannel);
        res.status(204).json("Chat eliminado");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Eliminar un usuario del chat
routerChannel.patch("/deleteUserFromChannel/:idChannel", jwtMiddleware, async (req, res) => {
    const idUserToDelete = req.body.user;
    const idChannel = req.params.idChannel;

    try {
        if (!idChannel)
            return res.status(404).json("IdChannel no está informado en los params");

        // si el chat existe lo buscamos en la base de datos y lo metemos en la variable chatModified
        const channelFound = await Channel.findById(idChannel);

        if (!channelFound) return res.status(404).json("Channel no encontrado");
        const deleteUserIndex = channelFound.user.indexOf(idUserToDelete);
        if (deleteUserIndex === -1) return res.status(404).json("Usuario no encontrado en el chat");
        const deleteUser = channelFound.user.splice(deleteUserIndex, 1);

        await channelFound.save();

        res.status(200).json(channelFound);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//MÉTODO AGRUPADO DE AÑADIR Y QUITAR USUARIOS MEDIANTE QUERY PARAMS
routerChannel.patch("/modifyUser/:idChannel?", jwtMiddleware, async (req, res) => {
    -q
    //Definición del query params:
    //method = a --> add users
    //method = d --> deleter users
    //user = 'id' --> usuario a eliminar/añadir
    //ejemplo query params --> /modifyUser/:idChat?method=a&user=idUser

    const method = req.query.method;
    const idUser = req.query.user;
    const idChannel = req.params.idChannel;

    if (!method) return res.status(404).json("Método no informado en la llamada");
    if (method !== "a" && method !== "d")
        return res
            .status(404)
            .json("Método con variables incorrectas. Tienen que ser a ó d");

    if (method === "d") {
        try {
            // comprobamos que el chat nos lo pasan por parametro de la url
            if (!idChannel)
                return res.status(404).json("IdChannel no está informado en los params");

            // si el chat existe lo buscamos en la base de datos y lo metemos en la variable chatModified
            const channelFound = await Channel.findById(idChannel);

            if (!channelFound) return res.status(404).json("Channel no encontrado");

            const deleteUserIndex = channelFound.user.indexOf(idUser);
            if (deleteUserIndex === -1)
                return res.status(404).json("Usuario no encontrado en el channel");

            const deleteUser = channelFound.user.splice(deleteUserIndex, 1);

            await channelFound.save();

            res.status(200).json(channelFound);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (method === "a") {
        try {
            // comprobamos que el chat nos lo pasan por parametro de la url
            if (!idChannel) return res.status(404).json("IdChannel no existe");

            // si el chat existe lo buscamos en la base de datos y lo metemos en la variable chatModified
            const channelModified = await Channel.findById(idChannel);

            //Validar que el usuario no está registrado ya
            const existingUser = await Channel.findOne({ _id: idChannel, user: idUser });

            if (existingUser) return res.status(404).json("El usuario ya existe en el chat");

            channelModified.user.push(idUser);

            await channelModified.save();
 

            res.status(200).json(channelModified);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(400).json("Method not found");
    }
});


routerChannel.get("/userChannelId?", jwtMiddleware, async (req, res) => {

    //se espera algo tipo /userChannelId?idOrganización=1212123&idUser=238238283

    const idOrganizacion = req.query.idOrganizacion
    const idUser = req.query.idUser

    try {
        const allChannel = await Channel.find({ organizacion: idOrganizacion, user: idUser })
        //console.log('AllChats', allChats)

        res.status(200).json(allChannel);


    } catch (error) {
        res.status(500).json(error);
    }
});

routerChannel.get("/userChannels?", jwtMiddleware, async (req, res) => {

    //se espera algo tipo /userChannels?idOrganización=1212123&idUser=238238283

    const idOrganizacion = req.query.idOrganizacion
    const idUser = req.query.idUser

    try {
        const allChannels = await Channel.find({ organizacion: idOrganizacion, user: idUser }).populate('user')
        const response = {
            channels: allChannels,
                }

        res.status(200).json(response);


    } catch (error) {
        res.status(500).json(error);
    }
});

export default routerChannel;
