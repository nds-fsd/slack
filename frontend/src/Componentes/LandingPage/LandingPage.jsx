//SIN USO

import styles from "./landingPage.module.css";
import videoVerde from '../../Assets/480_verde.mp4';
import imagenChat from '../../Assets/videochat_umlaut.jpg';
import {Link} from "react-router-dom"
import logoNasa from '../../Assets/logo-nasa.png'
import logoMundoToday from '../../Assets/logo-elmundotoday2.png'
import logoAirbnb from '../../Assets/airbnb-logo.png'
import slackLogo from '../../Assets/slackLogo.png'
import PublicChat from "../public-chat/public-chat";
import {io} from "socket.io-client";
const socket = io("http://localhost:3001");



const LandingPage = () =>{


    return (

        <div>
            <div className={styles.seccion1}>
                <div className={styles.seccion1_1}> 
                    <h2>Una aplicación para tomarte las cosas con <span className={styles.commentRed}>calma.</span></h2>
                    <p> Reúne a tus amigos y compañeros de trabajo y dedica tiempo a todo aquello que sume valor. Reduce las reuniones, mensajes y correos.</p>
                    <Link to="/user"><button type="submit" to="/user">Regístrate con un correo</button></Link>
                    <p> <span className={styles.commentRed}>SkuadLack es gratuíto</span> y no se cambiarán las políticas de precios como hace Movistar</p>
                </div>
                <div className={styles.seccion1_2}>
                    <img className={styles.img} src={imagenChat} /> 
                </div>
            </div>

            <div className={styles.seccion2}>
                <h2>Empresas y personas de todo el mundo confían en SkuadLack</h2>
                <div className={styles.seccion2_1}>
                    <img id={styles.logoNasa} className={styles.logos} src={logoNasa} alt="Logo Nasa"/>
                    <img id={styles.logoMundoToday} className={styles.logos}  src={logoMundoToday} alt="Logo Mundo Today"/>
                    <img id={styles.logoAirbnb} className={styles.logos}  src={logoAirbnb} alt="Logo Airbnb"/>
                    <img id={styles.logoSlack} className={styles.logos}  src={slackLogo} alt="Slack Logo"/>
                </div>
                
                <div><PublicChat socket={socket}/></div>
                <div>seccion 2.3</div>
                <div>sección 2.4</div>

            </div>
            <div className={styles.seccion3}>sección 3</div>
            <div className={styles.seccion4}>sección 4</div>
            <div className={styles.seccion5}>sección 5</div>

        </div> 
    
    )}


export default LandingPage

/* Temas pendientes:

1. Hacerlo responsive
2. Fondo hay una línea blanca que no consigo eliminar
*/
