import React, { useState } from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import fetchSupreme from "../../utils/apiWrapper";
import styles from "./deleteChat.module.css";
import { BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalDialog } from "react-bootstrap";

const DeleteChat = (props) => {
  //paso por props el chatId por que por el contexto parece que no funciona bien
  const { setRefreshContext, refreshContext } = useSkuadLackContext();
  const chatId = props.currentChat._id;
  let path;
  props.currentChat && props.currentChat.name
    ? (path = "deleteChannel")
    : (path = "deleteChat");

  const handleOnClick = () => {
    chatId &&
      fetchSupreme(
        `/${path}/${chatId}`,
        "DELETE",
        undefined,
        true,
        undefined
      ).then((res) => {
        setRefreshContext(!refreshContext);
        setShow(false);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BsTrash
        className={styles.botonDelete}
        variant="primary"
        onClick={handleShow}
      >
        Launch demo modal
      </BsTrash>
    
      <Modal  className={styles.containerModal} show={show} onHide={handleClose} centered >
      <div className={styles.bodyModal}>
        <Modal.Header>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are trying to delete the <strong>{props.currentChat && props.currentChat.name
            ? props.currentChat.name
            : "Chat"}</strong>
        </Modal.Body>
    
        <Modal.Footer>
          <Button className = {styles.button}  onClick={() => handleOnClick()}>
            Delete
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default DeleteChat;
