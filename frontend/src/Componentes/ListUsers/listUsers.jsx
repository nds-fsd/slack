import React, { useEffect, useState } from "react";
import User from "../User/user";
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

        <div className={styles.listado}>
            <table>
            <tr>
                <th>Id</th>
                <th>Nombre de usuario</th>
                <th>Email</th>
                <th>Apellido</th>
                <th>Editar</th>
                <th>Eliminar</th>
          </tr>
          <tr>
            
            <td>{list && list.map((users)=> <User key={users._id} id={users._id} /> )}</td>
            <td>{list && list.map((users)=> <User key={users._id} userName = {users.userName} /> )}</td>
            <td>{list && list.map((users)=> <User key={users._id} email = {users.email} /> )}</td>
            <td>{list && list.map((users)=> <User key={users._id} lastName={users.lastName}/> )}</td>
            <td><button>Edit</button></td>
            <td><button>Eliminar</button></td>
            
            </tr>
            </table>
        </div>

)}

export default ListUsers