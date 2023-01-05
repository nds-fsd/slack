import React, { useState } from "react";
import styles from "./index.module.css"
import video from '../../Assets/480_verde.mp4'


const LandingPage = () =>{



    return (
        <div className={styles.seccion}>

            <div className={styles.navBar}>Barra de navegación superior</div>
            
            <div className={styles.seccion1}>
                <video src={video} type="video/mp4" autoPlay loop/> 
            
            </div>

            <div className={styles.seccion2}>sección 2</div>
            <div className={styles.seccion3}>sección 3</div>
            <div className={styles.seccion4}>sección 4</div>
            <div className={styles.seccion5}>sección 5</div>

        </div>   
    
    )}


export default LandingPage