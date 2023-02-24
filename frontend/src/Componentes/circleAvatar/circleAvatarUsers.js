import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSkuadLackContext } from "../../contexts/skuadLack-context"
import fetchSupreme from '../../utils/apiWrapper';

function CircleAvatarUsers({ name, color, size, id, path }) {
  // Extraer las dos primeras letras del nombre

  const {idOrganizacionActual, setChats, chats, setRefreshContext, refreshContext, idUser } = useSkuadLackContext()

 const createChat= () => {
    fetchSupreme(`/createChatById`, "POST", {organizacion: idOrganizacionActual, idUser: [id, idUser] }, true, undefined)
    .then((res) => {
        setRefreshContext(!refreshContext)
        console.log(res)     

    })

  }

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  // Estilos CSS para el círculo
  const circleStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: size / 2,
    textTransform: 'uppercase',
  };


  return (
  
  <button onClick={createChat} style={circleStyle}>{initials}</button>
  )
}

export default CircleAvatarUsers;