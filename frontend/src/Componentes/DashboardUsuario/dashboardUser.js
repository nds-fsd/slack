//SIN USO

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchSupreme from "../../utils/apiWrapper";
import NotFound from "../NotFound/notFound";
import styles from './dashboard.module.css';



const DashboardUser = () =>{

  //const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"

    const navigate = useNavigate()
    let params = useParams()
    const [user, setUser] = useState("")
  const navigatePath = ()=>{
    navigate(`/editUser/${user._id}`)
  }
    useEffect(() => {
      fetchSupreme(`/user/${params.id}`, 'GET', undefined, false,undefined)
    /*
      fetch(`${URL_API}/user/` + params.id)
    .then((res)=>{
        return res.json();
    })
    */
    .then((res)=>{
        setUser(res);
    });
}, [params.id]);
    
    const deleteUser = () =>{

  const url = `${URL_API}/user/` + params.id;
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  };
  fetch(url, options)
    .then((res) => {
      res.json();
    })
    .then(() => {
      alert(`Usuario ${user.userName} eliminado.`)
      navigate('/')
    });
    }
 if(!user) return(<div><NotFound/></div>)
    
    return(
        <div>
        <div className={styles.title}>
            <h1>DASHBOARD DE {user.userName}</h1>
        </div>
        <div className={styles.container}>
          <div>
            <h3>Username</h3>
            <input value={user.userName}/>
          </div>
          <div>
            <h3>Email</h3>
            <input value={user.email}/>
          </div>
          <div>
            <h3>Nombre</h3>
            <input value={user.name}/>
          </div>
          <div>
            <h3>Apellido</h3>
            <input value={user.lastName}/>
          </div>
          <div className={styles.containerbutton}>
            
          <div className={styles.buttonedit}>
           <button onClick={navigatePath} type="submit">Editar</button>
          </div>  
          <div className={styles.buttondelete}>
            <button type="submit" onClick={deleteUser}>Eliminar</button>
          </div>
          </div> 
        </div>
        </div>
        
    )
}

export default DashboardUser;