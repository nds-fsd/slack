import React from "react";
import Styles from "./formOrganizacion.css"

const FormOrganizacion = () =>{
    return(
        <div id='formOrg'>
            <h1 className="tituloFormOrg" id="tituloCorreo">Primero, introduce tu correo electrónico</h1>
            <p className="comentarioCorreo">Te sugerimos que uses la<b className="comentarioCorreo"> dirección de correo electrónico que usas en el trabajo</b></p>
            <input className="inputFormOrg" id = "inputCorreo" type = "text" placeholder="nombre@work-email.com" ></input>

            <h1 className="tituloFormOrg" id="tituloNombreOrg">¿Cómo se llama tu fantástico equipo?</h1>
            <input className="inputFormOrg" id = "inputNombreOrg" type = "text" placeholder="Avengers" ></input>

            <h1 className="tituloFormOrg" id="tituloTrabajoActual">¿En qué está trabajando tu equipo actualmente?</h1>
            <input className="inputFormOrg" id = "inputTrabajoActual" type = "text" placeholder="Ocupados salvando al mundo" ></input>
            <button className="button" id='butFormOrg'>Continuar</button>
            
        </div>
        
 
)}

export default FormOrganizacion