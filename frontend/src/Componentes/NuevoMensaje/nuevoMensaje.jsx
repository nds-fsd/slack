import React from "react";
import styles from './nuevoMensaje.module.css'

const NuevoMensaje = () =>{



    return(
        <div className={styles.contenedorNuevoMensaje}>
            <p className={styles.nuevoMensaje}>Tienes un nuevo mensaje</p>
        </div>
    )
}

export default NuevoMensaje