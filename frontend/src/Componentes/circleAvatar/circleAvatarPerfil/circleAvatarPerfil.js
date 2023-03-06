import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './circleAvatarPerfil.module.css'

function CircleAvatarPerfil({ name, color, size, id,}) {
  // Extraer las dos primeras letras del nombre

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
  
  <Button as={Link} to={`user/${id}`} className={styles.button} style={circleStyle}>{initials}</Button>
  )
}

export default CircleAvatarPerfil;