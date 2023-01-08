import React from "react";
import Styles from "./user.module.css"

const User = (props)=>{

    const userName = props.userName
    const email =props.email
    const lastName = props.lastName
    const idUser=props.id
   

    return(

        <div className={Styles.user}>
            <input type="text" className={Styles.inputUser}/><label>Nombre de usuario: {userName}</label><br></br>
            <input type="text" className={Styles.inputEmail}/><label>Email: {email}</label><br></br>
            <input type="text" className={Styles.inputLastName}/><label>Apellido: {lastName}</label><br></br>
            <input type="text" className={Styles.inputLastName}/><label>id: {idUser}</label><br></br>
        </div>

)}

export default User