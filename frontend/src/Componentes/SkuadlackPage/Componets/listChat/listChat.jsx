import React from "react";
import styles from "./listChat.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { v4 as uuidv4 } from "uuid"; //sugerido por ChatGTP como una biblioteca para generar claves únicas para el .map
import { useSkuadLackContext } from "../../../../contexts/skuadLack-context";


const ListChat = () => {
  const {userNames, chatIds, myUserName, chatId, setChatId, setRoom} = useSkuadLackContext()
  
  const obtenerValor = (item) => {
    
    const elemento = userNames.find(e => e === item);
    const indexId = userNames.findIndex(e => e === item);

    //setChatId(chatIds[indexId])
    setRoom(chatIds[indexId])

    //return alert(`Estás haciendo click en ${elemento} y idChat ${chatIds[indexId]}`);
  };

  console.log('userNames',userNames)
  return (
    <div className={styles.chatContainer}>
      <ListGroup className={styles.listGroup} as="ol" >
        {userNames &&
          userNames.map((e) => {
            const uniqueKey = uuidv4();

            if (e.toString() === myUserName) {
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
                  {(e.filter(item=>item !==myUserName)).join(" | ")}
                </ListGroup.Item>
              );
            }
          })}
      </ListGroup>
    </div>
  );
};

export default ListChat;