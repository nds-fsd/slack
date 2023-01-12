import React, { useEffect, useState } from "react";
import styles from "./listUsers.module.css"

const ListUsers = ()=>{

    const [list, setList]=useState([]);

    useEffect (()=> {
        fetch("http://localhost:3001/user")
            .then((response)=>{
                return response.json();
            })
            .then((res)=>{
                setList(res);
            })
            console.log('Acabado el fetch');
    },[list])

    return(

        
        <div className={styles.listadoTabla}>   
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nombre de usuario</th>
                    <th>Email</th>
                    <th>Apellido</th>
                    <th className={styles.thBotones}>Editar</th>
                    <th className={styles.thBotones}>Eliminar</th>
                </tr>  
          
               {list && list.map((datosTabla)=>( 

                <tr>
                    <td> {datosTabla._id}</td>
                    <td> {datosTabla.userName}</td>
                    <td> {datosTabla.email}</td>
                    <td> {datosTabla.lastName}</td>
                    <td className={styles.botones}><button className={styles.butEdit}>Editar</button></td>
                    <td className={styles.botones}><button className={styles.butEliminar}>Eliminar</button></td>
                </tr>   
                
                ))}

            </table>
        </div>

)}

export default ListUsers

/*
Pendiente:
1. Hacer que el scroll de la tabla no supere el encabezado. Es decir que no puedean subir las filas por encima del encabezado
2. Poner bordes al encabezado cuando haga scroll.
3. Añadir la funcionalidad de edición y borrado de un usuario
4. Aplicar la misma lógica a organizaciones
5. Meter ambas funcionalidades en un menú lateral que definal las acciones que puede realizar el admin

*/
