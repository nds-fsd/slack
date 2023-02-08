import express, { application } from 'express';
import Organizacion from "../Schemas/organizacion.js";
import { validateOrgName } from '../Middlewares/orgName.js';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware.js';
import User from '../Schemas/user.js';
const routerOrg = express.Router();

routerOrg.get('/organizacion',async(req,res)=>{
    try{
        const allOrganizacions = await Organizacion.find();
        res.status(200).json(allOrganizacions);
        }catch(error){
          res.status(500).json(error)
        }
});

// app.use(validateOrgName);

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

  //router para que cuando se cree la organización automáticamente se asocie al usuario que la crea
  routerOrg.post('/organizacionToUser',validateOrgName,jwtMiddleware, async (req,res)=> {
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
      const idUser= req.jwtPayload.id;
      console.log('id usuario que está logueado',idUser);

      //Fundamental el await!!!
      const user = await User.findById(idUser)

      console.log('userSchema', user)
      organizacion.user.push(idUser);
      
      console.log('user',user)
      console.log('organizacion',organizacion)

      //Primero guardar el organización para posteriormente mediante el _id poder relacionar el usuario
      await organizacion.save();
      user.organizacion.push(organizacion._id)
      
      //Necesario guardar de nuevo al existir cambios en el schema
      await user.save();
      //await userSchema.save();
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