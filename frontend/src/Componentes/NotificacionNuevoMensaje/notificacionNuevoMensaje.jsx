import React from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import stringToColour from "../../utils/stringToColour";
import styles from './notificacionNuevoMensaje.module.css'

const NotificacionNuevoMensaje = (props) => {
    const { myUserName, setRefreshContext, refreshContext,setIdOrganizacionActual } = useSkuadLackContext();
    const color = stringToColour(props.infoNotification.name)
    // let miIdChatLargo = props.infoNotification.idChat
    // let miIdChatCorto = miIdChatLargo.substring(miIdChatLargo.length - 5);
    const initials = props.infoNotification.userName
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    const circleStyle = {
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40 / 2,
        textTransform: 'uppercase',
    };

        const text = props.infoNotification.text.length > 25 ? props.infoNotification.text.substr(0,15) + '...' : props.infoNotification.text

    return (

        <div  onClick={() =>{           
          props.setShowNewMessage(false)
          setIdOrganizacionActual(props.infoNotification.idOrganizacion)
          setTimeout(() => {
            props.setCurrentChat(props.infoNotification.chat)
        }, [500]);
          
          }}className={styles.ContenedorNotificacionNuevoMensaje}>
            <div className={styles.skuadLack}>
                <img
                    className={styles.logo}
                    src={require("../../Assets/Png  logo.png")}
                /><p>SkuadLack</p>
            </div>
            <div className={styles.organizacion}>
                {props.infoNotification.organizacion}
            </div>
            <div className={styles.mensaje}>
                <div className={styles.circle}>
                    <button disabled style={circleStyle}>{initials}</button>
                </div>
                <div>
                    <p className={styles.NotificacionNuevoMensaje}>Nuevo mensaje de {props.infoNotification.userName} <br />
                        <span>{text}</span> <br /> en {props.infoNotification.chat.name 
                        ? `el channel ${props.infoNotification.chat.name}` 
                        : `el chat ${props.infoNotification.chat.user 
                            .map((u) => u.userName)
                            .filter((item) => item !== myUserName)
                            .join(" | ")}`}</p>
                </div>
            </div>
        </div>

    )
}

export default NotificacionNuevoMensaje