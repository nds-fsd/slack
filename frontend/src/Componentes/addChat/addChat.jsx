import React, { useEffect, useState } from "react";
import fetchSupreme from "../../utils/apiWrapper";
import styles from "./addChat.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { getUserSession } from "../../utils/localStorageUtils";
import { useParams } from "react-router-dom";

const AddChat = () => {
  const [userChats, setUserChats] = useState([]);
  const params = useParams()
  const idOrganizacion =params.id
  const idUser = getUserSession().id

  console.log('idUser', idUser)
  console.log('idOrganizacion',idOrganizacion)

  const body ={
    idUser:idUser,
    idOrganizacion: idOrganizacion
  }
  console.log('string query', `idOrganizacion=${idOrganizacion}&idUser=${idUser}`)

//Cogemos todos los chats del usuario de la ruta definida para ese propósito
  useEffect(() => {
    fetchSupreme("/userChats", "GET", undefined, true, `idOrganizacion=${idOrganizacion}&idUser=${idUser}`)
    .then((res) => {
      console.log('response',res)
    setUserChats(res)
 
    });
  }, []);

  console.log('userChats',userChats)

  return (
 
    <div className={styles.contenedorChats}>

      <ListGroup>
       
       {userChats && userChats.map((e)=>{

           return (<ListGroup.Item key={e.user + 'keyId'}>{e.user}</ListGroup.Item>)

      })}
       
      </ListGroup>
        

    
    </div>
    
  );
};

export default AddChat;

/*

      <ListGroup>
       
            {arrayOrgData && arrayOrgData.map((e)=>(
    
                <ListGroup.Item key={e._id + 'keyId'}>{e}</ListGroup.Item>

            ))}
            
      </ListGroup>
    */