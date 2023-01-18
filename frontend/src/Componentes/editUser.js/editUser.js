import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { patchToMongo } from "../../utils/fetchToMongo";
import NotFound from "../NotFound/notFound";
import styles from "./editUser.module.css"

const EditUser = () => {
    // Varuiables y estados
    let params = useParams()
    const [user, setUser] = useState("")
    const navigate = useNavigate();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm()

    // funciones o efectos
    useEffect(() => {
        fetch("http://localhost:3001/user/" + params.id)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setUser(res);
                setValue("userName", res.userName)
                setValue("name", res.name)
                setValue("lastName", res.lastName)
                setValue("email", res.email)

            });
    }, []);

    const onDataSubmit2 = (data) => {
        patchToMongo(`user/${user._id}`, data).then((dataServer) => {
            alert(`el usuario ${dataServer.userName} ha sido modificado.`)
            navigate(`/user/${dataServer._id}`)
        })

    }
    const deleteUser = () => {
        const url = "http://localhost:3001/user/" + params.id;
        const options = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        };
        fetch(url, options)
            .then((res) => {
                res.json();
            })
            .then(() => {
                alert(`Usuario ${user.userName} eliminado.`)
                navigate('/')
            });
    }
    if (!user) return (<div><NotFound /></div>)

    return (
        <>
            <div className={styles.title}>
                <h1>Perfil de {user.userName}</h1>
            </div>
            <form className={styles.card} onSubmit={handleSubmit(onDataSubmit2)}>
                <h3>Nombre de usuario</h3>
                <input placeholder='Nuevo nombre de usuario.' {...register("userName", { required: true, minLength: 5, maxLength: 20 })} />
                {errors.userName?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.userName?.type === "minLength" && "Tu nombre de usuario debe tener mínimo 5 carácteres"}
                {errors.userName?.type === "maxLength" && "Tu nombre de usuario debe tener máximo 20 carácteres"}
                <h3>E-mail</h3>
                <input placeholder='Nuevo email.' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                {errors.email?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.email?.type === "pattern" && "Comprueba que sea una direccion de mail válida"}
                <h3>Nombre</h3>
                <input placeholder=' Nuevo nombre.' {...register("name", { required: true, minLength: 3, maxLength: 20 })} />
                {errors.name?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.name?.type === "minLength" && "Tu nombre debe tener mínimo 3 carácteres"}
                {errors.name?.type === "maxLength" && "Tu nombre debe tener máximo 20 carácteres"}
                <h3>Apellido</h3>
                <input placeholder=' Nuevo apellido.' {...register("lastName", { required: true, maxLength: 20 })} />
                {errors.lastName?.type === "required" && <span>❌campo obligatorio❗❗</span>}
                {errors.lastName?.type === "maxLength" && "Tu apellido debe tener máximo 20 carácteres"}
                <br />
                <button type="submit">Guardar Cambios</button>
                <button onClick={deleteUser}>Eliminar</button>
            </form>
        </>
    )
}

export default EditUser;