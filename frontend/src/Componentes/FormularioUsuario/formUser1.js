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
    alert(`el usuario ${dataServer.userName} ha sido creado.`)
    navigate(`/user/${dataServer._id}`)
     })
 }
    return (
        <>
        <div className={styles.title}>
        <h1>Bienvenido a SkuadLack </h1>
        </div>
        <form className={styles.card} onSubmit={handleSubmit(onDataSubmit2)}>
            <h3>Rellena el siguiente campo con tu nombre usuario, este sera el visible.</h3>
            <input placeholder='Nombre de Usuario.' {...register("userName" , {required: true, minLength: 5, maxLength: 20})} />
            {errors.userName?.type === "required" && <span>❌campo obligatorio❗❗</span>}
            {errors.userName?.type === "minLength" && "Tu nombre de usuario debe tener mínimo 5 carácteres"}
            {errors.userName?.type === "maxLength" && "Tu nombre de usuario debe tener máximo 20 carácteres"}
            <h3>Rellena el siguiente campo con tu email.</h3>
            <input placeholder='email.' {...register("email" , {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} />
            {errors.email?.type === "required" && <span>❌campo obligatorio❗❗</span>}
            {errors.email?.type === "pattern" && "Comprueba que sea una direccion de mail válida"}
            <h3>Rellena el siguiente campo con tu nombre.</h3>
            <input placeholder='Nombre.' {...register("name" , {required: true, minLength: 3})} />
            {errors.name?.type === "required" && <span>❌campo obligatorio❗❗</span>}
            {errors.name?.type === "minLength" && "Tu nombre debe tener mínimo 3 carácteres"}
            <h3>Rellena el siguiente campo con tu apellido.</h3>
            <input placeholder='Apellido.' {...register("lastName" , {required: true})} />
            {errors.lastName && <span>❌campo obligatorio❗❗</span>}
            <br/>
            <input type="submit"/>
        </form>
        </>

    )
}

export default FormUser1;