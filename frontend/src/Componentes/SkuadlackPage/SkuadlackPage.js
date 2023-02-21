import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Search } from './Componets/BarraSuperior/search'
import io from 'socket.io-client';
import { getUserSession } from '../../utils/localStorageUtils';
import {useForm} from 'react-hook-form'
import fetchSupreme from '../../utils/apiWrapper';
const socket = io('http://localhost:8081',{
  reconnection: false
})

export const SkuadlackPage = () => {
  let userId = getUserSession()
  userId = userId.id
  console.log(userId)
  // const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('')
  const [roomInfo, setRoomInfo] = useState([]);
  const [message, setMessage] = useState([]);
  const {register, handleSubmit, reset} = useForm()

  useEffect(() => {
      fetchSupreme(`/user/${userId}`, 'GET', undefined, true, undefined)
      .then((res) => {
                setUser(res);
      });
  },[userId])

  console.log(user.organizacion) ///
  // useEffect(() => {
  //   const newSocket = io('http://localhost:8081');
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, []);

  useEffect(() =>{
    const mensajeBienvenida = ({from, message, room }) =>{
      setRoom(room)
      console.log( `este es el mensaje de bienvenida ${message} desde el ${from}`)
    }
    socket.on('userConect', mensajeBienvenida)
    return()=> {
      socket.off('userConect', mensajeBienvenida)
    }
  }, [room])

  useEffect(()=>{
    const InfoDelSocket = (data) =>{
      setRoom(data.roomId)
      console.log('respuesta del BE', data)
      setMessage([...message, {dataMessage: data.message, from: data.from}])
    }
    socket.on('reply', InfoDelSocket )
    return()=>{
      socket.off('reply', InfoDelSocket )
    }
  }, [message])

  const onSubmit = (data) =>{
    console.log('Data Onsubmit: ', data)
    socket.emit('chat', {message: data.message, room: room, roomId:roomInfo._id})
    setMessage([...message,{from: 'Yo', dataMessage: data.message} ])
    reset()
  }

  // const handleOrganizacion = (e) => {
  //   e.preventDefault()
  //   user.organizacion.map((org) => {
  //     if(org._id === e.target.value) {
  //       setRoom(org.OrgName)
  //       console.log(org)
  //       setRoomInfo(org)
  //       socket.emit('entra en la Sala', {room: e.target.value, previousRoom: room})
  //       setMessage([])
  //     }
  //     reset()
  //     return null
  //     })
  // }

  return (
    <PageStyle>
      <div className='barrasuperior'>
        <div>{roomInfo.OrgName}</div>
        <div><Search/></div>
        <div>fotoPerfil</div>
      </div>
  

      <div className="cuerpo">
      <div className="box1">
        <div className="AddOrg">+</div>
        <div className="Org">Organizaciones</div>
        <div className="AddOrg">+</div>
      </div>



    <div className="box2">
        
          <div>
            OrgName
          </div>
      </div> 

      <div className="box3">
        <div className="barraSuperiorChat">
          <div>nombre canal/user(s) con el que hablas</div>
            <div>opciones </div>
          </div>
  
          <div className='bodyChat'>
            {message.map((msg, i) => {
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
const PageStyle = styled.div `


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

