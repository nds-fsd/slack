import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSkuadLackContext } from "../../contexts/skuadLack-context"
import styles from './circleAvatar.module.css'

function CircleAvatar({ name, color, size, id, path }) {
  // Extraer las dos primeras letras del nombre

  const {setChatId, setIdOrganizacionActual } = useSkuadLackContext()

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0,2)
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
  
  <Button onClick= {()=>setIdOrganizacionActual(id)} as={Link} to={path + id} className ={styles.circleOrg} style={circleStyle}>{initials}</Button>
  )
}

export default CircleAvatar;