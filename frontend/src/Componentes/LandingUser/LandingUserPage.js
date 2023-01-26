import React from 'react'
import styled from 'styled-components'
import { MdWavingHand, MdSettings } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const LandingUserPage = () => {
  return (
    <LUPstyle>

    <div>
        <h1 className='headtitle'>¡Bienvenido user <span className='rojo'>"name"! <MdWavingHand /></span></h1>
    </div>

    <div>
    <Card className='cardstyle' border="warning">
      <Card.Header as="h5" className='cardhead'><span className='rojo'>Organizaciones SkuadLack</span> de "user@mail"</Card.Header>
      <Card.Body>
        <div className='cardtext'>
        <Card.Text>
         <p>Org / Name / Img / Icons</p>
        </Card.Text>
        </div>
        <div className='btncard'>
        <Button  variant="primary">Iniciar "OrgName"</Button>
        </div> 
      </Card.Body>
    </Card>
    </div>

    <div>
    <Card className='cardstyle' border="warning">
      <Card.Header as="h5" className='cardhead'>Crea tu nueva <span className='rojo'>Organizacion SkuadLack</span></Card.Header>
      <Card.Body>
        <div className='cardtext'>
        <Card.Text>
         <p>¿Quieres usar <span className='rojo'>Skuadlack</span> con un equipo distinto?</p>
        </Card.Text>
        </div>
        <div className='btncard'>
        <Button as={Link} to="/organizacion" variant="primary">Crea tu Organizacion</Button>
        </div> 
      </Card.Body>
    </Card>
    </div>

    <div className='perfiluser'>
        <h2><span className='icono'><MdSettings/></span> Perfil</h2>
    </div>
    </LUPstyle>
  )
}
const LUPstyle = styled.div`
display: flex;
flex-direction: column;
justify-items: center;
justify-content: center;
text-align: center;
padding-top: 5.5rem;
background-color: #242A38 ;


.headtitle{
    text-align: start;
    padding-left: 2rem;
    font-weight: bolder;
    color: #f2f2f2;
}

.rojo{
    color: #E65262;
}
.cardstyle{
    display: flex;
    width: 80%;
    margin: 2rem;
    text-align: start;
    font-weight: bold;
    border-style: double;

}
.cardhead{
    font-weight: bolder;
    background-color: #fbe2d7;
    

}
.card-body{
    display: flex;
    justify-content: flex-end;
    background-color: #f2f2f2;


}
.btncard{
    display: flex;
    align-items: end;
    justify-content: center;
    margin-left: 6rem;
    width: 35%;
}
.cardtext{
    justify-content: flex-start;
    width: 50%;
}
.perfiluser{
    width: 90%;
    text-align: end;
    padding: 1.5rem;
    padding-left: 3rem;
    font-weight: bolder;
    color: #f2f2f2;
    align-items: baseline;
    align-content: center;
    align-content: flex-end;
}
    
.icono{
    position: relative;
    color: #E65262;
    top: -.15rem;
    }
`