import React, { useEffect, useState } from "react";
import fetchSupreme from "../../utils/apiWrapper";
import styles from "./listChat.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { getUserSession } from "../../utils/localStorageUtils";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; //sugerido por ChatGTP como una biblioteca para generar claves únicas para el .map

const ListChat = () => {
  const [userNames, setUserNames] = useState([]);
  const [chats, setChats]=useState([])
  const [userNameActual, setUserNameActual] = useState("");
  const[chatIds, setChatIds]=useState([''])
  const [bottonValue, setBottonValue] = useState('');
  const params = useParams();
  const idOrganizacion = params.id;
  const idUser = getUserSession().id;
  //console.log('userSession',getUserSession())

  //Cogemos todos los chats del usuario de la ruta definida para ese propósito
  useEffect(() => {
    fetchSupreme(
      "/userChats",
      "GET",
      undefined,
      true,
      `idOrganizacion=${idOrganizacion}&idUser=${idUser}`
    ).then((res) => {
      //console.log('response',res)
      setUserNames(res.users);
      setChats(res.chats)
      setChatIds(res.chatIds)
    });
    //En el UserSession no tengo mi userName, por lo que realizo otra llamada para obtener mis datos de usuario
    fetchSupreme(`/user/${idUser}`, "GET", undefined, true, undefined).then(
      (res) => {
        setUserNameActual(res.userName);
        //console.log('userNameActual',userNameActual)
      }
    );
  }, []);

  const obtenerValor = (item) => {
    
    const elemento = userNames.find(e => e === item);
    const indexId = userNames.findIndex(e => e === item);

    //console.log('indexId', indexId)
    //console.log('chat id alert')
    //console.log('prueba', chatIds[indexId])

    return alert(`Estás haciendo click en ${elemento} y idChat ${chatIds[indexId]}`);
  };

  //console.log('userNames',userNames)

  return (
    <div className={styles.chatContainer}>
      <ListGroup className={styles.listGroup} as="ol" numbered>
        {userNames &&
          userNames.map((e) => {
            const uniqueKey = uuidv4();

            if (e.toString() === userNameActual) {
              return (
                <ListGroup.Item
                  className={styles.elementChat}
                  variant="Dark"
                  key={uniqueKey}
                  action
                  onClick={() => obtenerValor(e)}
                >
                  {e} : tú{" "}
                </ListGroup.Item>
              );
            } else {
              return (
                <ListGroup.Item
                  className={styles.elementChat}
                  variant="Dark"
                  key={uniqueKey}
                  action
                  onClick={() => obtenerValor(e)}
                >
                  {e}
                </ListGroup.Item>
              );
            }
          })}
      </ListGroup>
    </div>
  );
};

export default ListChat;