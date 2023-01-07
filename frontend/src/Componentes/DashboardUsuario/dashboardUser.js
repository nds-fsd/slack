import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from './dashboard.module.css';


const DashboardUser = () =>{
    const params = useParams()
    const [user, setUser] = useState[{}]
    fetch("http://localhost:3001/user/" + params.id)
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        setUser(res);
    })
    
    return(
        <>
        <div className={styles.title}>
            <h1>DASHBOARD DE {user.userName}</h1>
        </div>
        <div className={styles.container}>
          <div>
            <h3>Nombre de Usuario</h3>
            <input>{user.userName}</input>
          </div>
          <div>
            <h3>Email</h3>
            <input>{user.email}</input>
          </div>
          <div>
            <h3>Nombre</h3>
            <input>{user.name}</input>
          </div>
          <div>
            <h3>Apellido</h3>
            <input>{user.lastName}</input>
          </div>
          <div className={styles.containerbutton}>
            
          <div className={styles.buttonedit}>
            <button type="submit">Editar</button>
          </div>  
          <div className={styles.buttondelete}>
            <button type="submit">Eliminar</button>
          </div>
          </div> 
        </div>
        </>
        
    )
}

export default DashboardUser;