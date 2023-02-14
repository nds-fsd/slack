import React, { useEffect, useState } from "react";
import fetchSupreme from "../../utils/apiWrapper";
import styles from "./addChat.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { getUserSession } from "../../utils/localStorageUtils";
import { useParams } from "react-router-dom";

const AddChat = () => {
  const [orgData, setOrgData] = useState([]);
  const params = useParams()
  const idOrganizacion =params.id

  useEffect(() => {
    fetchSupreme(`/organizacion/${idOrganizacion}`, "GET", undefined, true, undefined).then((res) => {
        setOrgData(res);
   
    });
  }, []);

  console.log('datos organización', orgData)


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