import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Search = () => {
  return (
    <div>
        <InputGroup size="sm" className='style'>
          <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="buscar usuario/canal"
          />
        </InputGroup>
    </div>

  )
}