import React from "react";
import camiseta from "../../../Assets/camiseta.png";
import styles from './easterEgg.module.css'

const EasterEgg = () => {
  return (

    <div className={styles.contenedor}>
        <h2>Enhorabuena!</h2>
      <p className={styles.text}>Si has conseguido llegar hasta aquí, te lo tienes más que merecido!</p>
      <img className={styles.imagen} src={camiseta} />
      <p className={styles.text}>
        Por el módico precio de 50€!! Habla con los fundadores para más
        información.
      </p>
    </div>
  );
};

export default EasterEgg;
