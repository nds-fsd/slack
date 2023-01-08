import React from "react";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import styles from "./formUser.module.css"
import { postToMongo } from "../../utils/fetchToMongo.js";

const FormUser1 = () =>{
    
 const navigate = useNavigate();
 const { register, handleSubmit, formState:{errors}} = useForm()
 const onDataSubmit2 = (data) => {
  postToMongo("user", data).then((dataServer) => {
    console.log(dataServer)
    navigate(`/user/${dataServer._id}`)
     })
 }
    return (
        <form className={styles.card} onSubmit={handleSubmit(onDataSubmit2)}>
            <input placeholder='Coloca tu nombre de Usuario.' {...register("userName" , {required: true})} />
            {errors.userName && <span>si no sabes tu nombre tienes un problema.</span>}
            <input placeholder='Coloca tu email.' {...register("email" , {required: true})} />
            {errors.email && <span>si no sabes tu email tienes un problema.</span>}
            <input placeholder='Coloca tu nombre.' {...register("name" , {required: true})} />
            {errors.name && <span>si no sabes tu email tienes un problema.</span>}
            <input placeholder='Coloca tu apellido.' {...register("lastName" , {required: true})} />
            {errors.lastName && <span>si no sabes tu email tienes un problema.</span>}
            <input type="submit"/>
        </form>
    )
}

export default FormUser1;