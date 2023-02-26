import React from "react";
import styles from './notificacionNuevoMensaje.module.css'

const NotificacionNuevoMensaje = () =>{



    return(
        <div className={styles.ContenedorNotificacionNuevoMensaje}>
            <p className={styles.NotificacionNuevoMensaje}>Tienes un nuevo mensaje</p>
        </div>
    )
}

export default NotificacionNuevoMensaje