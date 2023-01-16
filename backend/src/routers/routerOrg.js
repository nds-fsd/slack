import express from 'express';
import Organizacion from "../Schemas/organizacion.js";
import { validateOrgName } from '../Middlewares/orgName.js';
const routerOrg = express.Router();

routerOrg.get('/organizacion',async(req,res)=>{
    try{
        const allOrganizacions = await Organizacion.find();
        res.status(200).json(allOrganizacions);
        }catch(error){
          res.status(500).json(error)
        }
});

routerOrg.post('/organizacion',validateOrgName, async(req,res)=> {
    const body = req.body;
    const data = {
      OrgName: body.OrgName,
      OrgMail: body.OrgMail,
      OrgDescription: body.OrgDescription
    };
  
    if (!data.OrgName || !data.OrgMail) {
      return res.status(422).send("Falta el nombre o el correo electrónico de la organización");
    }
  
    try {
      const organizacion = new Organizacion(data);
      await organizacion.save();
      res.status(201).json(organizacion);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });
  
routerOrg.get('/organizacion/:id', async (req,res)=>{
    const id = req.params.id
    try{
    const organizacion = await Organizacion.findById(id)
    if (organizacion){
        res.status(200).json(organizacion)
    }else{
        res.status(404).send('No existe este usuario')
    }}catch(error){
        res.status(500).json(error)
    }
});

routerOrg.patch('/organizacion/:id',validateOrgName, async(req,res)=>{
    try{
        const organizacionModified = await Organizacion.findByIdAndUpdate(req.params.id, req.body);
        if(organizacionModified){
            res.status(200).json(organizacionModified);
        } else{
            res.status(404).send('Organización no encontrada')
        }
    }catch(error){
        res.status(500).send("La id buscada no existe").json(error.message)
    }
});

routerOrg.delete('/organizacion/:id', async(req,res)=>{
  const id = req.params.id;

  try {
    const organizacion = await Organizacion.findById(id);
    if (!organizacion) {
      return res.status(404).send("Recurso no encontrado");
    }

    await organizacion.delete();
    res.send("Recurso eliminado con éxito");
  } catch(error) {
    res.status(500).json(error);
  }
});




export default routerOrg;