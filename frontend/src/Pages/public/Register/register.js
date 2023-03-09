import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css"
import { postToMongo } from "../../../utils/fetchToMongo.js";
import fetchSupreme from "../../../utils/apiWrapper";
import { setUserSession } from "../../../utils/localStorageUtils";

const Register = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit,setError, formState: { errors } } = useForm()
    const switchShow = () => setShow(!show);
    const onDataSubmit2 = (data) => {

        fetchSupreme("/register","POST",data,false,null)
        
        .then((res) => {

            setUserSession(res)
            navigate(`/LUP/${res.user.id}`)
        })
        .catch((error)=>{
            console.log('error', error)
            Object.keys(error).forEach((key)=>{
                setError(key, {type: "backend", message: error[key]})
            })
        })
}
    
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
                {errors.userName?.type === "backend" && errors.userName.message + ' ❗❗'}

                <h3>Email</h3>
                <input placeholder='email' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                {errors.email?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.email?.type === "pattern" && "Comprueba que sea una direccion de mail válida"}
                {errors.email?.type === "backend" && errors.email.message + ' ❗❗'}

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
                <div className={styles.password}>
                <input placeholder='password' type={show ? 'text' : 'password'} {...register("password", { required: true })} />
                <button type="button" onClick={switchShow}>{show ? '🔒' : '👁️‍🗨️'}</button>
                {errors.password && <span>❌campo obligatorio❗❗</span>}
                </div>
                <br />
                <input id = {styles.botonEnviar} type="submit" />
            </form>
        </div>

    )
}

export default Register;