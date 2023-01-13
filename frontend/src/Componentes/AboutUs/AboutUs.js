import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import styles from "./AboutUs.module.css";
import Image from 'react-bootstrap/Image'

const AboutUs = () => {
  return (<div>

    <div className={styles.seccion1}>
      <div className={styles.seccion1_1}>
        <CardGroup>
          <Card>
            <Card.Img variant="top"  img src="./Assets/Nico.jpg" />
            <Card.Body>
              <Card.Title>Nico</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>

    </div>

    <div className={styles.seccion2}>
      <h2>Empresas y personas de todo el mundo confían en SkuadLack</h2>


      <div>sección 2.2</div>
      <div>sección 2.3</div>
      <div>sección 2.4</div>

    </div>
    <div className={styles.seccion3}>sección 3</div>
    <div className={styles.seccion4}>sección 4</div>
    <div className={styles.seccion5}>sección 5</div>

  </div>

  );
}

export default AboutUs