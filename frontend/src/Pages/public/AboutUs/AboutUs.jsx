import styles from "./AboutUs.module.css";
import React from "react";
import Nico from '../../../Assets/Nico.jpg';
import Dani from '../../../Assets/daninueva.jfif';
import Jorge from '../../../Assets/Jorge.jpeg';
import German from '../../../Assets/german1.jpeg';
import Norma from '../../../Assets/Norma.png';

const AboutUs = () => {
  return (
    <div>

      <div className={styles.seccion1}>
        <div>
          <h2>Encantados de presentarles al equipo de SkuadLack</h2>
          <img className={styles.logo}
            style={{ height: '90px', width: '75px' }}
            src={require("../../../Assets/Png  logo.png")}
          />
        </div>
        <h5>Estudiantes y alumnos de Nuclio Digital School, desarrollaron esta app en su BootCamp.</h5>
        <div className={styles.seccion1_1}>

          <ul>
            <li>
              <figure>
                <img src={Nico} style={{ height: '270px', width: '200px' }} alt='Nico' />
                <figcaption>
                  <p>Nicolas García<br />García <br />
                  alias <span>Nico</span><br />
                  <a href="https://www.linkedin.com" target='_blank'>LinkedIn</a> <br/>
                  <a href="https://github.com" target='_blank'>GitHub</a>
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={Dani} style={{ height: '270px', width: '200px' }} alt='Dani' />
                <figcaption>
                  <p>Dani Castro <br />Martin<br />
                    alias <span>Samu 3</span><br />
                    <a href="https://www.linkedin.com/in/dcm91" target='_blank'>LinkedIn</a><br />
                    <a href="https://github.com/DCM91" target='_blank'>GitHub</a>
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={Jorge} style={{ height: '270px', width: '200px' }} alt='Jorge' />
                <figcaption>
                  <p>Jorge Cuesta<br /> Cuaresma <br />
                    alias <span>Cuaresma</span><br />
                    <a href="https://www.linkedin.com/in/jorge-cuesta-cuaresma" target='_blank'>LinkedIn</a><br />
                    <a href="https://github.com/JorgeCCuaresma" target='_blank'>GitHub</a>
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={German} style={{ height: '270px', width: '200px' }} alt='German' />
                <figcaption>
                <p>Germán Cachafeiro<br/> Bamonde <br />
                  alias <span>Yermany</span><br />
                  <a href="https://www.linkedin.com/in/germ%C3%A1n-cachafeiro-bamonde/" target='_blank'>LinkedIn</a> <br/>
                  <a href="https://github.com/gercaba" target='_blank'>GitHub</a>
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img src={Norma} style={{ height: '270px', width: '200px' }} alt='Norma' />
                <figcaption>
                <p>Norma Boix<br />
                  alias <span>Normi</span><br />
                  <a href="https://www.linkedin.com" target='_blank'>LinkedIn</a> <br/>
                  <a href="https://github.com" target='_blank'>GitHub</a>
                  </p>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>

      </div>



    </div>

  );
}

export default AboutUs