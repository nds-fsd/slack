import styles from "./AboutUs.module.css";
import React from "react";
import Nico from '../../../Assets/Nico.jpg';
import Dani from '../../../Assets/Dani.jpg';
import Jorge from '../../../Assets/Jorge.jpeg';
import German from '../../../Assets/German.jpg';
import Norma from '../../../Assets/Norma.png';

const AboutUs = () => {
  return (
    <div>

      <div className={styles.seccion1}>
        <div className={styles.seccion1_1}>
          <ul>
            <li>
              <figure>
                <img src={Nico} alt='Nico' />
                <figcaption>
                  <p>Texto descricion  Texto descricion Texto descricion Texto descricion </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={Dani} alt='Dani' />
                <figcaption>Texto descricion Texto descricion Texto descricion Texto descricion </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={Jorge} alt='Jorge' />
                <figcaption>Texto descricion Texto descricion Texto descricion </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={German} alt='German' />
                <figcaption>Texto descricion Texto descricion Texto descricion </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={Norma} alt='Norma' />
                <figcaption>Texto descricion Texto descricion Texto descricion </figcaption>
              </figure>
            </li>
          </ul>
        </div>

      </div>

    

    </div>

  );
}

export default AboutUs