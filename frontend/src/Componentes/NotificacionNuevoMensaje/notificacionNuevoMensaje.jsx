import React from "react";
import styles from './notificacionNuevoMensaje.module.css'

const NotificacionNuevoMensaje = (props) =>{

    // let miIdChatLargo = props.infoNotification.idChat
    // let miIdChatCorto = miIdChatLargo.substring(miIdChatLargo.length - 5);

    return(
        <div className={styles.ContenedorNotificacionNuevoMensaje}>
            <p className={styles.NotificacionNuevoMensaje}>Nuevo mensaje de {props.infoNotification.userName} <br/> {props.infoNotification.text} <br/> en el chat {props.infoNotification.chatName}</p>
        </div>
    )
}

export default NotificacionNuevoMensaje