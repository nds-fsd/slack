import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    },[])
    
   
      
    
    

    // const deleteUser = (datosTabla) =>{
    //     const url = "http://localhost:3001/user/" + datosTabla._id
    //     const options = {
    //       method: "DELETE",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //       }
    //     };
    //     fetch(url, options)
    //       .then((res) => {
    //         res.json();
    //       })
    //       .then(() => {
    //         alert(`Usuario  eliminado.`)
           
    //       });
    //       }



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
                    <td className={styles.botones}><Link to={`../user/${datosTabla._id}`}><button className={styles.butEdit}>Editar</button></Link></td>
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
3. borrado de un usuario// intento de eliminar usuario y creo que por que hay un map se borran todos, no entiendo por que
4. Aplicar la misma lógica a organizaciones
5. Meter ambas funcionalidades en un menú lateral que definal las acciones que puede realizar el admin
6.Al poner list en la array de dependencias loop infinito lograr que la pagina si hay un cambio en la lista de usuarios
actualice al momento, asi se conseguia pero claro loop infinito 

*/
