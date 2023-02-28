import React from "react";
import styles from './notificacionNuevoMensaje.module.css'

const NotificacionNuevoMensaje = (props) =>{

    let miIdChatLargo = props.infoNotification.idChat
    let miIdChatCorto = miIdChatLargo.substring(miIdChatLargo.length - 5);

    return(
        <div className={styles.ContenedorNotificacionNuevoMensaje}>
            <p className={styles.NotificacionNuevoMensaje}>Tienes un nuevo mensaje: {props.infoNotification.text} de {props.infoNotification.userName} en el chat {miIdChatCorto}</p>
        </div>
    )
}

export default NotificacionNuevoMensaje