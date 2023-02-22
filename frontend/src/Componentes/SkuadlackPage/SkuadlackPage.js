import React, { useEffect, useState } from 'react'
import Nav from "react-bootstrap/Nav";
import styled from 'styled-components'
import { useSkuadLackContext } from '../../contexts/skuadLack-context'
import ListChat from '../listChat/listChat'
import { Search } from './Componets/BarraSuperior/search'
import io from 'socket.io-client';
import { useForm } from 'react-hook-form'
import CircleAvatar from './Componets/circleAvatar/circleAvatar'
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
const socket = io(window.location.hostname === "skuadlack.netlify.app" ? "https://skuadlack.up.railway.app" : "http://localhost:3001", {
  reconnection: false
});
///esta useEffect no la borreis, es otra manera de llamar al socket como la Linea 11

// useEffect(() => {
//   const newSocket = io('http://localhost:8081');
//   setSocket(newSocket);
//   return () => newSocket.close();
// }, []);


export const SkuadlackPage = () => {

  const { user, idUser, organizacionActual, myOrganizaciones, idOrganizacionActual } = useSkuadLackContext()
  const room = idOrganizacionActual
  const [message, setMessage] = useState([]);
  const { register, handleSubmit, reset } = useForm()


  useEffect(() => {
    //cuando monto el componente emito un joinroom con el id de la organizacion
    socket.emit('joinRoom', room)

    return () => {
      //si cambia el id de organizacion emito un evento leave que el backend se encarga de desconectarme 
      // socket.emit('leave', room);
    }
  }, [idOrganizacionActual])


  useEffect(() => {
    const InfoDelSocket = (data) => {

      console.log('respuesta del BE', data)
      setMessage([...message, { dataMessage: data.message, from: data.from, room: data.room }])
    }
    socket.on('reply', InfoDelSocket)
    return () => {
      socket.off('reply', InfoDelSocket)

    }
  }, [message])

  const onSubmit = (data) => {
    console.log('Data Onsubmit: ', data)
    socket.emit('chat', { message: data.message, room: room, from: user.userName })
    setMessage([...message, { from: 'Yo', dataMessage: data.message, room: room }])
    reset()
  }

console.log(message)
  return (
    <PageStyle>
      <div className='barrasuperior'>
        <div>{organizacionActual.OrgName}</div>
        <div><Search /></div>
        <Nav.Link as={Link} to={`/LUP/${idUser}`}>
          <Button variant="warning">Dashboard</Button>
        </Nav.Link>
        <div>fotoPerfil</div>

      </div>

      <div className='cuerpo'>

        <div className='box1'>
          <div className='AddOrg'>+</div>
          {myOrganizaciones && myOrganizaciones.map((e) => (
            <div className='Org'><p><CircleAvatar name={e.OrgName} id={e._id} color="#3f485b" size={40} /></p></div>
          ))}
          <div className='AddOrg'>+</div>
        </div>

        <div className='box2'>
          <div className='chatbox'>
            <h4>{organizacionActual.OrgName}</h4>
            <h4>{organizacionActual.OrgDescription}</h4>
          </div>
          <div className='chatbox'>canales </div>
          <div className='chatbox'>
            <ListChat />
          </div>
        </div>

        <div className="box3">
          <div className="barraSuperiorChat">
            <div>{`Public chat ${organizacionActual.OrgName}`}</div>
            <div>opciones </div>
          </div>

          <div className='bodyChat'>
            {message.map((msg, i) => {
              if (idOrganizacionActual === msg.room)
                return (
                  <div key={i}>
                    <div>{msg.from}:</div>
                    <div>{msg.dataMessage}</div>
                  </div>
                )
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='barraSuperiorChat'>
              <div><input {...register('message')} /></div>
              <div><button type='submit'>Enviar</button></div>
            </div>
          </form>
        </div>

        <div className='box1'>
          <div className='AddOrg'>+</div>
          <div className='Org'>users conectados</div>
          <div className='AddOrg'>+</div>
        </div>
      </div>
    </PageStyle>
  )
}
const PageStyle = styled.div`


    display: block;
    justify-content: center;
    text-align: center;
    color : #f2f2f2;
    max-height: fit-content;





.barrasuperior{
  height: 8vh;
  background-color: #090a0f;
  z-index: 2000;
  color: #f2f2f2;
  width: 100%;
  padding: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
 
}




.cuerpo{
  display: flex;
  flex-direction: row;
  height: 92vh;
  width: 100%;
  margin: 0;
  

  .box1{

    padding: .3rem;
    background: #D9D9D9;
    height: 100%;
    width: 5%;
    text-align: center;
    color: #090a0f;
    font-size: x-large;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    .Org{
      height: 80%;
      word-wrap: break-word;
    }
    .AddOrg{
      height: 10%;
    }
  }
  .box2{
    background-color: #3F485B;
    position:static;
    padding: .3rem;
    padding-bottom: 0.2rem;
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-align: center;

    .chatbox{
      box-shadow: 2px 2px 5px #0A0A0B, -2px -2px 5px #445CA3;
      width: 100%;
      height: 32%;
      border-radius: 10px;
      background-color: #202430;
      display:flex;
      flex-direction:column;
      align-items:start;
      justify-content:start;
      justify-items:start;
      overflow:scroll;
      flex-wrap:wrap;
      position: relative;
      


    }

  }
  .box3{
    padding: .2rem;
    padding-bottom: .3REM;
    background-color: #3F485B;
    height: 100%;
    width: 65%;
    color: #090a0f;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    
    .barraSuperiorChat{
      height: 8vh;
      background-color: #202430;
      color: #f2f2f2;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      overflow: hidden;
      align-items: center;
      padding: 1rem;
      box-shadow: 2px  #0A0A0B, -2px  #445CA3;

    }
    .bodyChat{
      background-color: #3F485B;
      height: 100%;
      color: #f2f2f2;


    }
  
  }
}
`

