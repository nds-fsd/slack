import React, { useEffect, useState } from "react";
import styles from "./listUsers.module.css"

const ListUsers = ()=>{

    const [list, setList]=useState([]);

    useEffect (()=> {
        fetch("http://localhost:3001/users")
            .then((response)=>{
                return response.json();
            })
            .then((res)=>{
                setList(res);
            })
            console.log('Acabado el fetch');
    },[])

    return(

        
        <div className={styles.listadoTabla}>   
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nombre de usuario</th>
                    <th>Email</th>
                    <th>Apellido</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>  
          
               {list && list.map((datosTabla)=>( 

                <tr>
                    <td> {datosTabla._id}</td>
                    <td> {datosTabla.userName}</td>
                    <td> {datosTabla.email}</td>
                    <td> {datosTabla.lastName}</td>
                    <td><button>Editar</button></td>
                    <td><button>Eliminar</button></td>

             </tr>   
                
                ))}

            </table>
        </div>

)}

export default ListUsers
