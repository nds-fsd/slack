import React, { useState } from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import styles from "./createNewChannel.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import fetchSupreme from "../../utils/apiWrapper";

const CreateNewChannel = (props) => {

  const [checkedState, setCheckedState] = useState({});
  const [nameChannel, setNameChannel] = useState("")
  

  const handleClose = () => {
    props.setShowModal(false);
    setCheckedState({});
  };

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

    //Le tengo que añadir el usuario del login que es quien está interactuando y lo he quitado del checkbox. Pero se da por supuesto que el idUser también está dentro
    //A no ser que el usuario lo seleccione
    !trueKeys.includes(idUser) && trueKeys.push(idUser);

    

    const body = {
      organizacion: idOrganizacionActual,
      idUser: trueKeys,
      name: nameChannel,
    };

    fetchSupreme("/createChannelById", "POST", body, true, undefined).then(
      (res) => {
        setRefreshContext(!refreshContext);
        console.log(res);
        handleClose();
        setRefreshContext(!refreshContext)
        
    })    
  }
  const usersOrganizationWithoutMe = userOfOrganizacionActual.map((u) => u)
  .filter((item) => item.userName !== myUserName)
  return (
    <div>
       <Modal
        className={styles.containerModal}
        show={props.showModal}
        onHide={handleClose}
        keyboard={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={styles.bodyModal}>
          <Modal.Header>
            <Modal.Title>select a channel name and user/s</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <input onChange={(e)=>setNameChannel(e.target.value)}/>
              {userOfOrganizacionActual &&
                usersOrganizationWithoutMe.map((e) => {
                  //un array con objetos con las keys de cada user (userName, name, email...), la recorro para obtener los userName y pintarlos en un checkbox

                  //solo quiero los usuarios diferentes al mío
                
                 
                    return (
                      <Form.Check
                        type="checkbox"
                        label={e.userName}
                        value={e._id}
                        key={e?._id}
                        onChange={handleChange}
                        className = {styles.check}
                      />
                    );
                  
                })}
            </Form>
          </Modal.Body>
          
          <div className={styles.footer}>
            
            <Button
              className={styles.buttonCreate}
              onClick={() => handleOnClick(checkedState)}
            >
              Create Channel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewChannel;