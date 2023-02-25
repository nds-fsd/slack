import React, { useState } from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import styles from "./createNewChatWithUsers.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import fetchSupreme from "../../utils/apiWrapper";

const CreateNewChatWithUsers = () => {

  const [show, setShow] = useState(false);
  const [checkedState, setCheckedState] = useState({});

  //He puesto este useParams para evitar el contexto, ya que se renderiza muchas veces la página, no entiendo el por qué. Sigue pasando
  const params = useParams();

  const handleClose = () => {
    setShow(false)
    setCheckedState({})
    setRefreshContext(!refresContext)
};
  const handleShow = () => setShow(true);

  const {
    idOrganizacionActual,
    myUserName,
    idUser,
    userOfOrganizacionActual,
    setRefreshContext,
    refresContext
  } = useSkuadLackContext();

  /*
  useEffect(() => {
    fetchSupreme(
      `/organizacionUsers/${idOrganizacionActual}`,
      "GET",
      undefined,
      true,
      undefined
    ).then((res) => {
      setUsersOrg(res);
    });
  }, [idOrganizacionActual]);

  */

  //console.log("userOfOrganizacionActual", userOfOrganizacionActual);

  const handleChange = (e) => {
    const userId = e.target.value;
    const isChecked = e.target.checked;
    setCheckedState({ ...checkedState, [userId]: isChecked });
  };

  const handleOnClick= (objectStates)=>{
    
    const trueKeys = [];
    for (let key in objectStates) {
      if (objectStates[key]) {
        trueKeys.push(key);
      }
    }

    //Le tengo que añadir el usuario del login que es quien está interactuando y lo he quitado del checbox. Pero se da por supuesto que el idUser también está dentro
    trueKeys.push(idUser)

    const body = {
        organizacion: idOrganizacionActual,
        idUser:trueKeys
    }

    fetchSupreme('/createChatById','POST',body,true, undefined)
    .then((res) => {
        handleClose();
        
    })



  }
  console.log('checkedState', checkedState)

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        New Chat
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
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
                    />
                  );
                }
              })}
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={()=>handleOnClick(checkedState)}>Create Chat</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateNewChatWithUsers;
