import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { patchToMongo } from "../../utils/fetchToMongo";
import styles from "./editUser.module.css";
import { getUserToken, removeSession } from "../../utils/localStorageUtils";
import fetchSupreme from "../../utils/apiWrapper";
import { hasPermission } from "../../utils/rolePermissUtils";

const EditUser = (props) => {
  // Varuiables y estados
  let params = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [triger, setTriger] = useState(null);
  const userToEdit = props.userId;

  useEffect(() => {
    fetchSupreme(
      `/user/${userToEdit ? userToEdit : params.id}`,
      "GET",
      undefined,
      true,
      undefined
    )
      .then((res) => {
        setUser(res);

        setValue("userName", res.userName);
        setValue("name", res.name);
        setValue("lastName", res.lastName);
        setValue("email", res.email);
      });
  }, [triger, userToEdit]);

  const onDataSubmit2 = (data) => {
    fetchSupreme(`/user/${user._id}`, "PATCH", data, true, undefined).then(
      (dataServer) => {
        if (userToEdit) {
          props.setRefresh(true);
          props.setOpenModal(false);
        }
        if (hasPermission('GLOBAL_ADMIN')) {
          navigate('/users')
        }
        if (hasPermission('USER')) {
          setTriger(!triger)
        };
      }
    );
  };
  const deleteUser = () => {
    fetchSupreme(`/user/${params.id}`, "DELETE", undefined, true).then(
      () => {
        if (hasPermission('USER')) {
          removeSession();
          navigate('/')
        }
        if (hasPermission('GLOBAL_ADMIN')) {
          navigate('/users')
        }
      }
    );
  };

  return (
    <div className={userToEdit ? styles.contenedor : styles.contenedorRegister}>
      <form
        className={userToEdit ? styles.card : styles.cardRegister}

      >
        {!userToEdit && (
          <h1 className={styles.title}>
            Perfil de <span className={styles.span}>{user.userName}</span>
          </h1>
        )}
        <h3>Nombre de usuario</h3>
        <input
          placeholder="Nuevo nombre de usuario."
          {...register("userName", {
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
        />
        {errors.userName?.type === "required" && (
          <span>❌campo obligatorio❗❗</span>
        )}
        {errors.userName?.type === "minLength" &&
          "Tu nombre de usuario debe tener mínimo 5 carácteres"}
        {errors.userName?.type === "maxLength" &&
          "Tu nombre de usuario debe tener máximo 20 carácteres"}

        <h3>E-mail</h3>
        <input
          placeholder="Nuevo email."
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email?.type === "required" && (
          <span>❌campo obligatorio❗❗</span>
        )}
        {errors.email?.type === "pattern" &&
          "Comprueba que sea una direccion de mail válida"}

        <h3>Nombre</h3>
        <input
          placeholder=" Nuevo nombre."
          {...register("name", { required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.name?.type === "required" && (
          <span>❌campo obligatorio❗❗</span>
        )}
        {errors.name?.type === "minLength" &&
          "Tu nombre debe tener mínimo 3 carácteres"}
        {errors.name?.type === "maxLength" &&
          "Tu nombre debe tener máximo 20 carácteres"}

        <h3>Apellido</h3>
        <input
          placeholder=" Nuevo apellido."
          {...register("lastName", { required: true, maxLength: 20 })}
        />
        {errors.lastName?.type === "required" && (
          <span>❌campo obligatorio❗❗</span>
        )}
        {errors.lastName?.type === "maxLength" &&
          "Tu apellido debe tener máximo 20 carácteres"}
        <br />
        <div>
          <button
            onClick={handleSubmit(onDataSubmit2)}
            className={
              userToEdit ? styles.buttonGuardar : styles.buttonGuardarRegister
            }

          >
            Guardar
          </button>
          {!userToEdit && (
            <button type='button' className={styles.botonEliminar} onClick={deleteUser}>
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditUser;
