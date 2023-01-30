import express, { application } from 'express';
import Channel from '../Schemas/channel.js';
const routerChannel = express.Router();
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';


//Todos los canales
routerChannel.get('/channel',jwtMiddleware,async(req,res)=>{
    try{
        const allChannels = await Channel.find();
        res.status(200).json(allChannels);
        }catch(error){
          res.status(500).json(error)
        }
});

//Crear un canal
routerChannel.post('/channel',jwtMiddleware, async(req,res)=> {
    const body = req.body;
    const data = {
      channelName: body.channelName,
      isPrivate: body.isPrivate      
    };  
    try {
      const channel = new Channel(data);
      await channel.save();
      res.status(201).json(channel);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });
  

//buscar un canal por id
  routerChannel.get('/channel/:id',jwtMiddleware, async (req,res)=>{
    const id = req.params.id
    try{
    const channel = await Channel.findById(id)
    if (channel){
        res.status(200).json(channel)
    }else{
        res.status(404).send('No existe este canal')
    }}catch(error){
        res.status(500).json(error)
    }
});

//Actualizar la información de un canal por id
routerChannel.patch('/channel/:id',jwtMiddleware, async(req,res)=>{
    try{
        const channelModified = await Channel.findByIdAndUpdate(req.params.id, req.body);

        if(channelModified){
            res.status(200).json(channelModified);  //Devuelve el canal original, no el modificado
        } else{
            res.status(404).send('Canal no encontrado')
        }
    }catch(error){
        res.status(500).send("La id buscada no existe").json(error.message)
    }
});


//Eliminar canal por ID
routerChannel.delete('/organizacion/:id',jwtMiddleware, async(req,res)=>{
  const id = req.params.id;

  try {
    const channelDelete = await Channel.findById(id);
    if (!channelDelete) {
      return res.status(404).send("Canal no encontrado");
    }

    await channelDelete.delete();
    res.send("Canal eliminado con éxito");
  } catch(error) {
    res.status(500).json(error);
  }
});




export default routerChannel;