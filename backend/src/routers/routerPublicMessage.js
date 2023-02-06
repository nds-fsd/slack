import express from "express";
import PublicMessage from "../Schemas/publicMessage.js";
const routerPublicMessage = express.Router();
import  {socketIoPublic}  from "../index.js";


routerPublicMessage.post('/publicMessage',  (req, res) => {
    const now = new Date()                       //guardamos en una variable la fecha
    const hour = now.getHours()                  //recurrimos a .getHours() un metodo de Date que te da el digito de la hora y lo guardamos en una variable
    if (hour < 10) { hour = '0' + hour }         //si es menor de 10 ese digito le concatenamos un 0 delante para que ej=> las 04 en vez de las 4.
    let minutes = now.getMinutes()               //recurrimos a .getMinutes() un metodo de Date que te da el digito de los minutos y lo guardamos en una variable
    if (minutes < 10) { minutes = '0' + minutes }//si es menor de 10 ese digito le concatenamos un 0 delante para que ej=> sean 04 minutos en vez de 4.
    const hourComplete = `${hour}:${minutes}`   //guardamos en una variable el formato que imprimimos ej=> 20:09
    req.body.hour = hourComplete  
    const { text, from } = req.body;
    const newMessage = new PublicMessage(req.body);

    newMessage.save((error, messageStored) => {
        if (error || !messageStored) {
            return res.status(404).send('Error saving message')
        }
    })
     socketIoPublic.emit("NEW_MESSAGE", newMessage);
    
     return res.status(200).json({
        status: "success",
        newMessage
    })


});

routerPublicMessage.get('/publicMessage', async(req,res)=>{
    const query = await PublicMessage.find({}).sort({ created_at: 1 });
    
    // query.exec((error, messages)=>{
    //     if(error){
    //         return res.status(500).json({
    //             status: 'error',
    //             message: 'Error al extraer los datos.'
    //         })
    //     }
    //     if(!messages){
    //         return res.status(404).json({
    //             status: 'error',
    //             message: 'No hay mensajes.'
    //         })
    //     }
    // })
        

        return res.status(200).send(query)
})

export default routerPublicMessage;