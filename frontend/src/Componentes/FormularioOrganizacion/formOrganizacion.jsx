import React, { useState } from "react";
import Styles from "./formOrganizacion.css"



const FormOrganizacion = () =>{

    const [email, setMail] = useState("");
    const [titulo, setTitulo] = useState("");
    const [trabajoActual, setTrabajoActual] = useState ("");

    const getEmail = (event)=> {
        setMail(event.target.value)
    }
    const getTitulo= (event)=> {
        setTitulo(event.target.value)
    }
    const getTrabajoActual = (event)=> {
        setTrabajoActual(event.target.value)
    }

    const postOrganizaciones = () =>{
        const url = "http://localhost:3001/organizacion";
        const body ={
            OrgMail: email,
            OrgMail: titulo,
            OrgDescription: trabajoActual
            //Saber exactamente las nomenclaturas del backend

        };
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(body),
          };
          fetch(url,options)
          .then((res)=>{
            res.json();
          })
          .then((data)=>{
            console.log(data)//aqui entiendo que cuando se cree el homepage de user habra que
                            //redirigir para que cargue el componente del perfil creado. => la home de ese perfil.
          })


        }



    return(

        <div id='formOrg'>
            <h1 className="tituloFormOrg" id="tituloCorreo">Primero, introduce tu correo electrónico</h1>
            <p className="comentarioCorreo">Te sugerimos que uses la<b className="comentarioCorreo"> dirección de correo electrónico que usas en el trabajo</b></p>
            <input className="inputFormOrg" id = "inputCorreo" type = "text" placeholder="nombre@work-email.com"  onChange={getEmail}></input>

            <h1 className="tituloFormOrg" id="tituloNombreOrg">¿Cómo se llama tu fantástico equipo?</h1>
            <input className="inputFormOrg" id = "inputNombreOrg" type = "text" placeholder="Avengers" onChange={getTitulo} ></input>

            <h1 className="tituloFormOrg" id="tituloTrabajoActual">¿En qué está trabajando tu equipo actualmente?</h1>
            <input className="inputFormOrg" id = "inputTrabajoActual" type = "text" placeholder="Ocupados salvando al mundo" onChange={getTrabajoActual}></input>

            <button className="button" id='butFormOrg' onClick={postOrganizaciones}>Continuar</button>
            
        </div>
        
 
)}

export default FormOrganizacion