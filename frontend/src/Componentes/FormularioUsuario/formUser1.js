import React from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import styles from "./formUser.module.css"
import { postToMongo } from "../../utils/fetchToMongo.js";
import fetchSupreme from "../../utils/apiWrapper";

const FormUser1 = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    

    const onDataSubmit2 = (data) => {
        console.log('data',data);

        const url= "/register"

        fetchSupreme(url,"POST",data,'cors',false)
        
        .then((res) => {
            //const user = dataServer
         
            console.log('Response', res.resUser);
            alert(`el usuario ${res.resUser.userName} ha sido creado.`)
            navigate(`/user/${res.resUser._id}`)
        })
}
/*
        postToMongo("register", data)
            .then((dataServer) => {
                const user = dataServer.resUser
                // console.log("soy token", user.userToken)
                alert(`el usuario ${user.userName} ha sido creado.`)
                navigate(`/user/${user._id}`)
            })
*/
    
    return (
        <div className={styles.contenedor}>
            {/* <div className={styles.title}>
                <h1>Bienvenido a SkuadLack </h1>
            </div> */}
            <form className={styles.card} onSubmit={handleSubmit(onDataSubmit2)}>
            {/* <h1>Bienvenido a SkuadLack </h1> */}
                <h3 className={styles.h3Usuario}>Usuario de <span className={styles.h3Span}>SkuadLack</span></h3>
                <input placeholder='Nombre de Usuario' {...register("userName", { required: true, minLength: 2, maxLength: 20 })} />
                {errors.userName?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.userName?.type === "minLength" && "Tu nombre de usuario debe tener mínimo 2 carácteres"}
                {errors.userName?.type === "maxLength" && "Tu nombre de usuario debe tener máximo 20 carácteres"}
                <h3>Email</h3>
                <input placeholder='email' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                {errors.email?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.email?.type === "pattern" && "Comprueba que sea una direccion de mail válida"}
                <h3>Nombre</h3>
                <input placeholder='Nombre' {...register("name", { required: true, minLength: 3, maxLength: 20 })} />
                {errors.name?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.name?.type === "minLength" && "Tu nombre debe tener mínimo 3 carácteres"}
                {errors.name?.type === "maxLength" && "Tu nombre debe tener máximo 20 carácteres"}
                <h3>Apellidos</h3>
                <input placeholder='Apellido' {...register("lastName", { required: true, maxLength: 20 })} />
                {errors.lastName?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.lastName?.type === "maxLength" && "Tu apellido debe tener máximo 20 carácteres"}
                <h3>Contraseña</h3>
                <input placeholder='password' {...register("password", { required: true })} />
                {errors.password && <span>❌campo obligatorio❗❗</span>}
                <br />
                <input id = {styles.botonEnviar} type="submit" />
            </form>
        </div>

    )
}

export default FormUser1;