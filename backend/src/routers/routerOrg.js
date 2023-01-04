import express from 'express';
import Organizacion from "../Schemas/organizacion.js";
const routerOrg = express.Router();

routerOrg.get('/organizacion',async(req,res)=>{
    try{
        const allOrganizacions = await Organizacion.find();
        res.status(200).json(allOrganizacions);
        }catch(error){
          res.status(500).json(error)
        }
});

routerOrg.post('/organizacion', async(req,res)=> {
    try{
    const body = req.body;
    const data = {
        OrgName: body.OrgName,
        OrgMail: body.OrgMail,
        OrgDescription: body.OrgDescription
    }
    const organizacion = new Organizacion(data);
    await organizacion.save();
    res.status(201).json(organizacion)
}catch(error){
    res.status(500).json(error)
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

routerOrg.patch('/organizacion/:id', async(req,res)=>{
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
    const id = req.params.id
    try{
        const organizacionDelete = await Organizacion.findByIdAndDelete(id)
        res.status(204).send('Organizacion eliminada')
    }catch(error){
        res.status(500).json(error)
    }
});



export default routerOrg;