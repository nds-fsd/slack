import styles from "./PublicChat.module.css";
import {URL} from "../../utils/constants.js";
import { useState, useEffect } from "react";

const PublicChat = ({ socket }) => {
  const [storedMessages, setStoredMessages] = useState([]);
  const [nickname, setNickName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //Carga inicial del histórico de conversación pública
  
  useEffect(() => {
   
    fetch('http://localhost:3001/publicMessage')
      .then((res) => res.json())
      .then((res) => {
        //es res.messages por que en el backend está definidos así en la respuesta
        
        setStoredMessages(res.messages);
       
      });
  }, []);

  useEffect(() => {
    // funcion para parsear los mensajes y actualizar el array a cada cambio del socket
    // bajo el evento "NEW_MESSAGE"
    const mensajeRecibido = (mensaje) => {
      const mensajeParseado = {
        ...mensaje,
        from: mensaje.from === nickname ? "Yo" : mensaje.from,
      };
      setMessages([mensajeParseado, ...messages]);
      console.log('setMessages', setMessages)
    };

    // Suscripcion al evento "NEW_MESSAGE con el callback a ejecutar"
    socket.on("NEW_MESSAGE", mensajeRecibido);

    return () => {
      socket.off("NEW_MESSAGE", mensajeRecibido);
    };
  }, [messages, socket, nickname]);

  const handlerSubmit = (e) => {
    //Evitamos recargar la página
    e.preventDefault();

    //Enviamos el mensaje sólo si se ha establecido un nickname
    if (nickname !== "") {
      //Limpiamos el mensaje
      setMessage("");

      //Petición http de tipo POST para guardar el mensaje:

      const body = {
        text: message,
        from: nickname,
      };
      fetch(URL + "publicMessage", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      });
    } else {
      alert("Para enviar mensajes debes establecer un nickname!!!");
    }
  };
  // deshabilitamos el cambio de nickname una vez seteado
  const nicknameSubmit = (e) => {
    setDisabled(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles["top-card"]}>
        <h1>PUBLIC CHAT</h1>
        <div
          className={`${styles["nickname-row"]} ${
            disabled ? styles.disabled : ""
          }`}
        >
          <input
            type="text"
            placeholder="Nickname..."
            disabled={disabled}
            onChange={(e) => setNickName(e.target.value)}
            value={nickname}
          />
          <button
            className={styles.button}
            disabled={disabled}
            onClick={nicknameSubmit}
          >
            Set Nickname
          </button>
        </div>
        <div className={styles["message-send-row"]}>
          <textarea
            type="text"
            placeholder="message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            
          />
          <button className={styles.button} onClick={handlerSubmit}>
            Send
          </button>
        </div>
      </div>

      {/* ------------- WINDOW CHAT ------------- */}

      <div className={styles.window} resize>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles["message-row"]} ${
              message.from === "Yo" ? styles.end : styles.start
            }`}
          >
            <div
              className={`${styles.message} ${
                message.from === "Yo"
                  ? styles["bg-self-blue"]
                  : styles["bg-light-blue"]
              }`}
            >
              {message.from}: {message.text}
            </div>
          </div>
        ))}

        <h3 className={styles["title-divider"]}>... Mensajes guardados ...</h3>
        {storedMessages.map((message, index) => (
          <div
            key={index}
            className={`${styles["message-row"]} ${
              message.from === nickname ? styles.end : styles.start
            }`}
          >
            <div
              className={`${styles.message} ${
                message.from === nickname
                  ? styles["bg-self-blue"]
                  : styles["bg-light-blue"]
              }`}
            >
              {message.from}: {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicChat;
