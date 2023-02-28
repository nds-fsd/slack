import React, { useState } from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import styles from "./createNewChatWithUsers.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import fetchSupreme from "../../utils/apiWrapper";

const CreateNewChatWithUsers = () => {
  const [show, setShow] = useState(false);
  const [checkedState, setCheckedState] = useState({});

  const handleClose = () => {
    setShow(false);
    setCheckedState({});
  };
  const handleShow = () => setShow(true);

  const {
    idOrganizacionActual,
    myUserName,
    idUser,
    userOfOrganizacionActual,
    setRefreshContext,
    refreshContext
  } = useSkuadLackContext();

  const handleChange = (e) => {
    const userId = e.target.value;
    const isChecked = e.target.checked;
    setCheckedState({ ...checkedState, [userId]: isChecked });
  };

  const handleOnClick = (objectStates) => {
    const trueKeys = [];

    for (let key in objectStates) {
      if (objectStates[key]) {
        trueKeys.push(key);
      }
    }

    //Le tengo que añadir el usuario del login que es quien está interactuando y lo he quitado del checbox. Pero se da por supuesto que el idUser también está dentro
    trueKeys.push(idUser);

    const body = {
      organizacion: idOrganizacionActual,
      idUser: trueKeys,
    };

    fetchSupreme("/createChatById", "POST", body, true, undefined).then(
      (res) => {
        setRefreshContext(!refreshContext);
        console.log(res);
        handleClose();
        setRefreshContext(!refreshContext)
        
    })

  }

  return (
    <div>
      <Button
        size="sm"
        id={styles.buttonCreateChatID}
        className={styles.buttonCreateChat}
        onClick={handleShow}
      >
        +
      </Button>

      <Modal
        className={styles.containerModal}
        show={show}
        onHide={handleClose}
        keyboard={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={styles.bodyModal}>
          <Modal.Header>
            <Modal.Title>Select the user name/s</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {userOfOrganizacionActual &&
                userOfOrganizacionActual.map((e) => {
                  //un array con objetos con las keys de cada user (userName, name, email...), la recorro para obtener los userName y pintarlos en un checkbox

                  //solo quiero los usuarios diferentes al mío
                  if (e.userName !== myUserName) {
                    return (
                      <Form.Check
                        type="checkbox"
                        label={e?.userName}
                        value={e._id}
                        key={e?._id}
                        onChange={handleChange}
                        className = {styles.check}
                      />
                    );
                  }
                })}
            </Form>
          </Modal.Body>
          
          <div className={styles.footer}>
            
            <Button
              className={styles.buttonCreate}
              onClick={() => handleOnClick(checkedState)}
            >
              Create Chat
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewChatWithUsers;
