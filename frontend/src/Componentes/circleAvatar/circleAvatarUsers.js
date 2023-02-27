import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSkuadLackContext } from "../../contexts/skuadLack-context"
import fetchSupreme from '../../utils/apiWrapper';
import Offcanvas from 'react-bootstrap/Offcanvas';

function CircleAvatarUsers({ name, color, size, id, path }) {
  const [show, setShow] = useState(false);
  const [userShow, setUserShow] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    fetchSupreme(`/user/${id}`, "GET", undefined, true, undefined)
      .then((res) => {
        setUserShow(res)

      })
  }

  // Extraer las dos primeras letras del nombre



  const { idOrganizacionActual, organizacionActual, setChats, chats, setRefreshContext, refreshContext, idUser } = useSkuadLackContext()

  const createChat = () => {
    fetchSupreme(`/createChatById`, "POST", { organizacion: idOrganizacionActual, idUser: [id, idUser] }, true, undefined)
      .then((res) => {
        setRefreshContext(!refreshContext)
      })

  }

  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
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
    <>
      <Button onClick={handleShow} className="me-2"
        style={circleStyle}>{initials}
      </Button>
      <Offcanvas show={show} placement="bottom" onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Usuario de {organizacionActual.OrgName} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h3>{userShow.userName}</h3>
          <h5>{userShow.name}</h5>
          <h5>{userShow.lastName}</h5>
          <h5>{userShow.email}</h5>
        </Offcanvas.Body>
      </Offcanvas>
    </>



  )
}

export default CircleAvatarUsers;