import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import fetchSupreme from '../../../utils/apiWrapper';
import { getUserSession } from '../../../utils/localStorageUtils';
import styles from './modalRollOrg.module.css'

const ModalRollOrg = (props) => {
    const [show, setShow] = useState(false);
    const [idOrg, setIdOrg] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const body = {
        idUser: getUserSession().id,
        idOrganizacion: idOrg
    }
    const makePost = () => {
        fetchSupreme('/user/enrollOrganization', 'POST', body, true, null)
            .then((res) => {
                handleClose();
                props.setRefresh(!props.refresh)
            })

    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Unirse
            </Button>

            <Modal className={styles.modal} show={show} onHide={handleClose}>
                <div className={styles.container}>
                <Modal.Header  >
                    <Modal.Title>Únete a una organización</Modal.Title>
                </Modal.Header>
                <Modal.Body>Pega el código en el siguiente apartado</Modal.Body>
                <input className={styles.inputId} onChange={(e) => setIdOrg(e.target.value)}></input>
                
                <div className={styles.footer}>
                    <Button variant="secondary" onClick={makePost}>
                        Unirme
                    </Button>
                </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalRollOrg;