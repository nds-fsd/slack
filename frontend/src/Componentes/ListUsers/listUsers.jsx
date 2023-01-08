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
            <h1>
            {list && list.map((users)=> <User key={users._id} id={users._id} userName = {users.userName} email = {users.email} lastName={users.lastName}/> )}
            </h1>
        </div>

)}

export default ListUsers