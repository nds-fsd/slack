
import styles from "./landingPage.module.css";
import imagenChat from '../../../Assets/videochat_umlaut.jpg';
import {Link} from "react-router-dom"
import logoNasa from '../../../Assets/logo-nasa.png'
import logoMundoToday from '../../../Assets/logo-elmundotoday2.png'
import logoAirbnb from '../../../Assets/airbnb-logo.png'
import slackLogo from '../../../Assets/slackLogo.png'
import EasterEgg from "../easterEgg/easterEgg";
import { useState } from "react";




const LandingPage = () =>{

    const [show, setShow] = useState(false)

    const handleOnClick = () =>{
        setShow(!show);

    }
    
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
                    <img id={styles.logoNasa} className={styles.logos} src={logoNasa} alt="Logo Nasa" onClick= {handleOnClick}/>
                    {show && <EasterEgg/>}
                    <img id={styles.logoMundoToday} className={styles.logos}  src={logoMundoToday} alt="Logo Mundo Today"/>
                    <img id={styles.logoAirbnb} className={styles.logos}  src={logoAirbnb} alt="Logo Airbnb"/>
                    <img id={styles.logoSlack} className={styles.logos}  src={slackLogo} alt="Slack Logo"/>
                </div>
    
            </div>

        </div> 
    
    )}


export default LandingPage

/* Temas pendientes:

1. Hacerlo responsive
2. Fondo hay una línea blanca que no consigo eliminar
*/
