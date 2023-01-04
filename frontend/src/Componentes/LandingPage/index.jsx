import React, { useState } from "react";
import styles from "./index.module.css"


const LandingPage = () =>{



    return (
        <div className={styles.seccion}>

            <div className={styles.navBar}>Barra de navegación superior</div>
            
            <div className={styles.seccion1}>
                <video src="/Users/gercaba/Documents/Nuclio/skuadlack/slack/frontend/src/Componentes/Media/480_verde.mov" loop={true} autoPlay > </video>
            
            
            </div>

            <div className={styles.seccion2}>sección 2</div>
            <div className={styles.seccion3}>sección 3</div>
            <div className={styles.seccion4}>sección 4</div>
            <div className={styles.seccion5}>sección 5</div>

        </div>   
    
    )}


export default LandingPage