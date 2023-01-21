import ModalBase from './modalBase.jsx'
import React, { useState, useRef, useEffect } from 'react';
import EditUser from '../editUser/editUser.js';
import styles from './modalEditUser.module.css'

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
      <ModalBase className={styles.modalBase} open={props.open} onClose={props.onClose}>

      
      <EditUser userId={props.userId} setOpenModal={props.setOpenModal} setRefresh={props.setRefresh} />


    </ModalBase>
  );
};

export default ModalEditUser;
/*
este boton cerraba el modal, estaba entre <ModalBase>
<button className={styles.botonClose} onClick={() => props.onClose()}> X </button>
*/