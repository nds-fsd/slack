import ModalBase from './modalBase.jsx'
import React, { useState, useRef, useEffect } from 'react';
import EditUser from '../editUser/editUser.js';

const ModalEditUser = (props) => {
  const [saveValue, setSaveValue] = useState('');
  const inputRef = useRef(null);

  //console.log('ModalEditUser', props.userId);

  useEffect(() => {

    const keyDownHandler = (event) => {
      //console.log('keyboardEvent', event);
      const { key, ctrlKey, metaKey } = event;
      if (inputRef.current && (ctrlKey || metaKey) && key === 'f') {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [inputRef]);

  return (
    <ModalBase open={props.open} onClose={props.onClose}>
      <p>Bienvenido al fantástico mundo de los modales</p>
      <br />
      {console.log('Props del ModalEditUser', props.userId)}
      <EditUser userId = {props.userId} setOpenModal = {props.setOpenModal} setRefresh = {props.setRefresh}/>
      <input
        ref={inputRef}
        type="text"
        value={saveValue}
        onChange={(e) => setSaveValue(e.target.value)}
      />
      <button onClick={() => props.onClose()}> cierre desde el children</button>
    </ModalBase>
  );
};

export default ModalEditUser;
