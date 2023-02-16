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



//Cogemos todos los chats del usuario de la ruta definida para ese propósito
  useEffect(() => {
    fetchSupreme(`/userChats?`, "GET", undefined, true, `idOrganizacion="${idOrganizacion}"&idUser="${idUser}"`)
    .then((res) => {
    setUserChats(res)
 
    });
  }, []);

  console.log(userChats)

  return (
 
    <div className={styles.contenedorChats}>

      
        

    
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