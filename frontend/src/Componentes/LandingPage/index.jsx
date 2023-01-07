import React, { useState } from "react";
import styles from "./index.module.css";
import videoVerde from '../../Assets/480_verde.mp4';
import videoMarron from '../../Assets/480_marron.mp4';
import logo from '../../Assets/logo.png';
import {Routes, Route, Link} from "react-router-dom"
import FormOrganizacion from "../FormularioOrganizacion/formOrganizacion";
import FormUser from "../FormularioUsuario/formUser";

const LandingPage = () =>{



    return (

        <div>

                      
            <div className={styles.seccion1}>
                <div className={styles.seccion1_1}> 
                    <h1>Una aplicación para tomarte las cosas con calma</h1>
                    <p> Reúne a tus amigos y compañeros de trabajo y dedica tiempo a todo aquello que sume valor. Reduce las reuniones, mensajes y correos.</p>
                    <Link to="/user"><button type="submit" to="/user">Regístrate con un correo</button> </Link>
                    <p> <b>SkuadLack es gratuíto</b> y no se cambiarán las políticas de precios como hace Movistar</p>
                </div>
                <div className={styles.contenedorVideo}>
                    <video className={styles.video} src={videoVerde} type="video/mp4" autoPlay loop muted/> 
                </div>
            </div>

            <div className={styles.seccion2}>
                sección 2
                <div>sección 2.1</div>
                <div>sección 2.2</div>
                <div>sección 2.3</div>
                <div>sección 2.4</div>
            </div>
            <div className={styles.seccion3}>sección 3</div>
            <div className={styles.seccion4}>sección 4</div>
            <div className={styles.seccion5}>sección 5</div>

            <Routes>
                <Route path="/user" element={<FormUser/>}></Route>
            </Routes>

        </div> 
    
    )}


export default LandingPage