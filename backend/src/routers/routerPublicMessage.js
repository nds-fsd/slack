import { Express } from "express";
import PublicMessage from "../Schemas/publicMessage";
const routerPublicMessage = express.Router();
import { io } from "..";

routerPublicMessage.post('/publicMessage',  (req, res) => {
    const { text, from } = req.body;
    const newMessage = new PublicMessage({ text, from });

    newMessage.save((error, messageStored) => {
        if (error || !messageStored) {
            return res.status(404).send('Error saving message')
        }
    })
     io.emit("NEW_MESSAGE", newMessage);
    return res.status(200).json(messageStored)

});

routerPublicMessage.get('/publicMessage', (req,res)=>{
    const query= Message.find({}).sort({ created_at: -1 });
    
    query.exec((error, messages)=>{
        if(error){
            return res.status(500).json({
                status: 'error',
                message: 'Error al extraer los datos.'
            })
        }
    })
        if(!messages){
            return res.status(404).json({
                status: 'error',
                message: 'No hay mensajes.'
            })
        }

        return res.status(200).json(messages)
})

export default routerPublicMessage;