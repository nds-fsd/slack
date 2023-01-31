import express from 'express';
import Chat from '../Schemas/chat.js';
const routerChat = express.Router();


routerChat.post('/chat/:id/createChat', async (req, res) => {



    const id = req.params.id
    const idOrganizacion = req.body._id
    try {
        const chat = await Chat.findById(id)
        console.log("USUARIO ENROLADO", user)
        if (!user) return res.status(404).json({ message: 'no encuentro el usuario' })
        if (user.organizacion.includes(idOrganizacion)) return res.status(400).json({ message: ' ya estas en la organizacion' })
        user.organizacion.push(idOrganizacion)
        await user.save()
        res.status(201).json(user)

     
    } catch (error) {
        res.status(500).json(error)
    }
})



export default routerChat;