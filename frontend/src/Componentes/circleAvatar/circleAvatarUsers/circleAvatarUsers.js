import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSkuadLackContext } from "../../../contexts/skuadLack-context"
import fetchSupreme from '../../../utils/apiWrapper';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "./circleAvatarUsers.module.css";

function CircleAvatarUsers({ name, color, size, id }) {
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

  



  const { idOrganizacionActual, organizacionActual, setChats, chats, setRefreshContext, refreshContext, idUser } = useSkuadLackContext()

// Extraer las dos primeras letras del nombre
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

      <Offcanvas className={styles.container} show={show} placement="end" onHide={handleClose} >

        <div className={styles.card}>
          <Offcanvas.Header className={styles.header}>
            <button disabled style={circleStyle}>{initials}</button>
            <Offcanvas.Title className={styles.tittle}>Usuario de {organizacionActual.OrgName} </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.body}>
            <input disabled id="userName" value={userShow.userName} />
            <input disabled id="name" value={userShow.name} />
            <input disabled id="lastName" value={userShow.lastName} />
            <input disabled id="email" value={userShow.email} />
          </Offcanvas.Body>
        </div>
      </Offcanvas>

    </>



  )
}

export default CircleAvatarUsers;