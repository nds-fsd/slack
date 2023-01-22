import React, { useState } from "react";
import styles from "./formOrganizacion.module.css"

const FormOrganizacion = () => {

    const [email, setMail] = useState("");
    const [name, setName] = useState("");
    const [trabajoActual, setTrabajoActual] = useState("");

    const getEmail = (event) => {
        setMail(event.target.value)
    }
    const getName = (event) => {
        setName(event.target.value)
    }
    const getTrabajoActual = (event) => {
        setTrabajoActual(event.target.value)
    }

    const postOrganizaciones = () => {
        const url = "http://localhost:3001/organizacion"; //pendiente saber la ruta
        const body = {
            OrgMail: email,
            OrgName: name,
            OrgDescription: trabajoActual

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
        fetch(url, options)
            .then((res) => {
                res.json();
            })
            .then((data) => {
                console.log(data)//aqui entiendo que cuando se cree el homepage de user habra que
                //redirigir para que cargue el componente del perfil creado. => la home de ese perfil.
            })
    }

    return (

        <div className={styles.contenedor}>
            <div className={styles.formOrg}>
                <h3 className={styles.tituloFormOrg} id={styles.tituloCorreo}>Correo electrónico</h3>
                <p className={styles.comentarioCorreo}>Te sugerimos que uses la<b className={styles.comentarioCorreo}> dirección de correo electrónico que usas en el trabajo</b></p>
                <input className={styles.inputFormOrg} id={styles.inputCorreo} type="text" placeholder="nombre@work-email.com" required onChange={getEmail}></input>

                <h3 className={styles.tituloFormOrg} id={styles.tituloNombreOrg}>¿Cómo se llama tu fantástico equipo?</h3>
                <input className={styles.inputFormOrg}id={styles.inputNombreOrg} type="text" placeholder="Avengers" required onChange={getName} ></input>

                <h3 className={styles.tituloFormOrg}id={styles.tituloTrabajoActual}>¿En qué está trabajando tu equipo actualmente?</h3>
                <input className={styles.inputFormOrg}id={styles.inputTrabajoActual} type="text" placeholder="Ocupados salvando al mundo" required onChange={getTrabajoActual}></input>

                <button type="submit" className={styles.botonContinuar} id={styles.butFormOrg} onClick={postOrganizaciones}>Continuar</button>
            </div>
        </div>


    )
}

export default FormOrganizacion