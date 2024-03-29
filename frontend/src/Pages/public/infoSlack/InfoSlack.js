import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import { MdConnectWithoutContact, MdGroupWork, MdSecurity } from 'react-icons/md';
 

const InfoSlack = () => {
  return (
    <InfoStyle>
      <div className='alldiv'>
        <h2>Trabaja más fácilmente con todos</h2>
        <p className='subtitulo'>
          Mantén la sintonía y toma decisiones
          más rápido al reunir toda tu comunicación laboral en un solo lugar.
        </p>
        <div className='cardsinfo'>

          <Card border='warning' bg='light' text='dark' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title><h1 className='icono'><MdGroupWork/></h1></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Canales</Card.Subtitle>
              <Card.Text>
                Mantén todo organizado y centrado con espacios centralizados
                para conversaciones, archivos, herramientas y personas.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card border='warning' bg='light' text='dark' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title><h1 className='icono'><MdConnectWithoutContact/></h1></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Skuad Connect</Card.Subtitle>
              <Card.Text>
                Colabora con equipos de otras empresas de la misma manera que lo haces
                con los equipos de la tuya
              </Card.Text>
            </Card.Body>
          </Card>

          <Card border='warning' bg='light' text='dark' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title><h1 className='icono'><MdSecurity/></h1></Card.Title>
              <Card.Subtitle className="mb-2 text-muted" >Seguridad</Card.Subtitle>
              <Card.Text>
                Proteger tus datos en cada capa es la base del funcionamiento de SkuadLack.
              </Card.Text>
            </Card.Body>
          </Card>


        </div>
      </div>
    </InfoStyle>
  );
}


const InfoStyle= styled.div`
.alldiv{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color:#242A38 ;
  min-width: 60vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: max-content;
  padding: 4rem;
  padding-top: 8rem;

}

h2{
  font-size: 3rem;
  padding: 0;
  margin: 0;
  width: 100%;
  color: #E75462;
}
.icono{
  color: #E75462;

}
.cardsinfo{
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  width: 90%;
  height: max-content;
  flex-wrap: wrap;
  margin: 2rem;

}
.subtitulo{
  color: #fff;
  width: 60vw;
  font-weight: bold;
  font-size: 1.5rem;
  
}
`

export default InfoSlack;