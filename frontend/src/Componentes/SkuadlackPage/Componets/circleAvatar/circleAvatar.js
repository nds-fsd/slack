import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CircleAvatar({ name, color, size, id }) {
  // Extraer las dos primeras letras del nombre
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

  return <Button as={Link} to={`/skuadlack/${id}`} style={circleStyle}>{initials}</Button>;
}

export default CircleAvatar;