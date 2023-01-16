import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { patchToMongo } from "../../utils/fetchToMongo";
import styles from "./editUser.module.css"

const EditUser = () =>{
    let params = useParams()
    const [user, setUser] = useState("")
    useEffect(() => {
        fetch("http://localhost:3001/user/" + params.id)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setUser(res);
        });
    }, [params.id]);

    console.log(user)
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{errors}} = useForm()
    const onDataSubmit2 = (data) => {
     patchToMongo(`user/${user._id}`, data).then((dataServer) => {        
       alert(`el usuario ${dataServer.userName} ha sido modificado.`)
       navigate(`/user/${dataServer._id}`)
        })
    }

    return(
        <>
        <div className={styles.title}>
        <h1>Modifica tus credenciales {user.userName}</h1>
        </div>
        <form className={styles.card} onSubmit={handleSubmit(onDataSubmit2)}>
            <h3>Tu actual nombre de usuario es <b>{user.userName}.</b></h3>
            <input placeholder='Nuevo nombre de Usuario.' {...register("userName" , {required: true})} />
            {errors.userName && <span>❌campo obligatorio❗❗</span>}
            <h3>Tu actual email es {user.email}.</h3>
            <input placeholder='Nuevo email.' {...register("email" , {required: true})} />
            {errors.email && <span>❌campo obligatorio❗❗</span>}
            <h3>Tu nombre es {user.name}.</h3>
            <input placeholder=' Nuevo nombre.' {...register("name" , {required: true})} />
            {errors.name && <span>❌campo obligatorio❗❗</span>}
            <h3>Tu apellido es {user.lastName}.</h3>
            <input placeholder=' Nuevo apellido.' {...register("lastName" , {required: true})} />
            {errors.lastName && <span>❌campo obligatorio❗❗</span>}
            <br/>
            <input type="submit"/>
        </form>
        </>
    )
}

export default EditUser;