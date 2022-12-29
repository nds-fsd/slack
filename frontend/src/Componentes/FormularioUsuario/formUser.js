import React, { useState } from "react";
import styles from "./formUser.module.css"

const FormUser = (props) =>{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")

    const getUsername = (event) =>{
        setUsername(event.target.value)
    }

    const getEmail = (event) =>{
        setEmail(event.target.value)
    }

    const getName = (event) =>{
        setName(event.target.value)
    }
    const getLastname = (event) =>{
        setLastname(event.target.value)
    }

    const postUser = () =>{
        const url = "http://localhost:3001/user";
        const body ={
            userName: username,
            email,
            name,
            lastName: lastname
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
        <div className={styles.card}>
            <h1>Bienvenido a SKUADLACK</h1>
            <h3>Rellena los siguientes campos para poder dar de alta tu perfil</h3>
            <form className={styles.form}>
                
                <label for="userName">
                   userName 
                   <input id="userName" type="text" required onChange={getUsername}/>
                   <p>Este campo será tu nombre visible en SKUADLACK.</p>
                </label>
                <label for="email">
                   email 
                <input id="email" type="text" required onChange={getEmail}/>
                   <p>Te recomendamos que te registres con el email del trabajo.</p>
                </label>
                <label for="name">
                   name 
                   <input id="name" type="text" required onChange={getName}/>
                   <p>Identificate con tu verdadero nombre.</p>
                </label>
                <button type="submit" onClick={postUser}>Enviar</button>
                <label for="lastName">
                   last name 
                   <input id="lastName" type="text" required onChange={getLastname}/>
                   <p>Identificate con tu verdadero apellido.</p>
                </label>
                <button type="submit" onClick={postUser}>Enviar</button>

            </form>
        </div>

    )
}

export default FormUser;