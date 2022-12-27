import React from "react";
import styles from "./formUser.module.css"

const FormUser = () =>{

    return(
        <div className={styles.card}>
            <h1>Bienvenido a SKUADLACK</h1>
            <h3>Rellena los siguientes campos para poder dar de alta tu perfil</h3>
            <form className={styles.form}>
                
                <label for="userName">
                   userName 
                   <input id="userName" type="text" required/>
                   <p>Este campo será tu nombre visible en SKUADLACK.</p>
                </label>
                <label for="email">
                   email 
                <input id="email" type="text" required/>
                   <p>Te recomendamos que te registres con el email del trabajo.</p>
                </label>
                <label for="name">
                   name 
                   <input id="name" type="text" required/>
                   <p>Identificate con tu verdadero nombre.</p>
                </label>
                <button type="submit">Enviar</button>


            </form>
        </div>

    )
}

export default FormUser;