import React from "react";
import styles from "./user.module.css"


const User = (props)=>{

    const userName = props.userName
    const email =props.email
    const lastName = props.lastName
    const idUser=props.id
   
    return(
        
        //<TablaUser data = {data}/>

        <table className={styles.tablaUser}>
          <tr>
                    <th>Id</th>
                    <th>Nombre de usuario</th>
                    <th>Email</th>
                    <th>Apellido</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
            </tr>
 
            <tr>
                <td>{idUser}</td>
                <td>{userName}</td>
                <td>{email}</td>
                <td>{lastName}</td>
                
            </tr>
            

        </table>
)}

export default User

//propiedad reset Hook Forms

 /*<div className={styles.user}>
            <div className={styles.infoUser}>
            <h2 type="text" className={styles.inputUser}/>Nombre de usuario: {userName}<br></br>
            <h2 type="text" className={styles.inputEmail}/>Email: {email}<br></br>
            <h2 type="text" className={styles.inputLastName}/>Apellido: {lastName}<br></br>
            <h2 type="text" className={styles.inputLastName}/>id: {idUser}<br></br>
            </div>
            <div className={styles.flex}>
                <button>Update user</button>
                <button>Delete user</button>
            </div>
        </div>

        https://www.w3schools.com/howto/howto_css_flip_card.asp
        */