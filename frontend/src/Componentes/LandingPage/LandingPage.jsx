import React, { useState } from "react";
import styles from "./landingPage.module.css";
import videoVerde from '../../Assets/480_verde.mp4';
import {Routes, Route, Link} from "react-router-dom"
import logoNasa from '../../Assets/logo-nasa.png'
import logoMundoToday from '../../Assets/logo-elmundotoday2.png'
import logoAirbnb from '../../Assets/airbnb-logo.png'
import logoMrBean from '../../Assets/mrBean.png'


const LandingPage = () =>{



    return (

        <div>
      
            <div className={styles.seccion1}>
                <div className={styles.seccion1_1}> 
                    <h1>Una aplicación para tomarte las cosas con calma</h1>
                    <p> Reúne a tus amigos y compañeros de trabajo y dedica tiempo a todo aquello que sume valor. Reduce las reuniones, mensajes y correos.</p>
                    <Link to="/user"><button type="submit" to="/user">Regístrate con un correo</button></Link>
                    <p> <b>SkuadLack es gratuíto</b> y no se cambiarán las políticas de precios como hace Movistar</p>
                </div>
                <div className={styles.seccion1_2}>
                    <video className={styles.video} src={videoVerde} type="video/mp4" autoPlay loop muted/> 
                </div>
            </div>

            <div className={styles.seccion2}>
                <h2>Empresas y personas de todo el mundo confían en SkuadLack</h2>
                <div className={styles.seccion2_1}>sección 2.1
                    <img src={logoNasa}></img>
                    <img src={logoMundoToday}></img>
                    <img src={logoAirbnb}></img>
                    <img src={logoMrBean}></img>
                </div>
                <div>sección 2.2</div>
                <div>sección 2.3</div>
                <div>sección 2.4</div>
            </div>
            <div className={styles.seccion3}>sección 3</div>
            <div className={styles.seccion4}>sección 4</div>
            <div className={styles.seccion5}>sección 5</div>

        </div> 
    
    )}


export default LandingPage

/* Temas pendientes:
1. Alinear correctamente la barra de navegación. No está perfectamente centrada
2. El video no soy capaz de darle bordes redondeados y sobras. El <video> ocupa toda el espacio vertical sin saber muy bien el porqué
3. Hacerlo responsive
*/