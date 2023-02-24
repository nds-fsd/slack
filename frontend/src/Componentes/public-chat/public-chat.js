import { useEffect, useRef, useState } from "react";
import styles from "./public-chat.module.css";
import Badge from 'react-bootstrap/Badge';
import { io } from "socket.io-client";
import { getUserSession } from "../../utils/localStorageUtils";
import fetchSupreme from "../../utils/apiWrapper";
import { useSocket } from "../../contexts/useSocket";


/*
const urlIO = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"
const socket = io(urlIO) 
*/

const PublicChat = () => {
    const {socket} = useSocket();

    const [nickname, setNickname] = useState("");
    const [disabled, setDisabled] = useState(false);
    const chat = useRef(null)
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [storedMessages, setStoredMessages] = useState([]);
    const scrollDownChat = () => {
        if (chat !== null && chat.current !== undefined) {
            chat.current.scrollTop = chat.current.scrollHeight
        }
    }
    useEffect(() => {

        //Cargamos los mensajes guardados en la BDD la primera vez
        //const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"
        fetchSupreme('/publicMessage','GET',undefined,false,undefined)
        /*
        fetch(`${URL_API}/publicMessage`)
            .then((res) => res.json())
        */
            .then((res) => {
                setStoredMessages(res);
                scrollDownChat()
                setNickname(getUserSession().name)

            });
    }, []);

    useEffect(() => {
        // funcion para parsear los mensajes y actualizar el array a cada cambio del socket
        // bajo el evento "NEW_MESSAGE"
        const receivedMessage = (message) => {
            const parsedMessage = {
                ...message,
                from: message.from === nickname ? "Yo" : message.from,
            };

            setMessages([...messages, parsedMessage]);

        };
        // Suscripcion al evento "NEW_MESSAGE con el callback a ejecutar"
        socket.on("NEW_MESSAGE", receivedMessage);
        scrollDownChat()
        //Desuscribimos el estado del componente cuando ya no es necesario utilizarlo
        return () => {
            socket.off("NEW_MESSAGE", receivedMessage);
        };
    }, [messages, socket, nickname]);

    const handlerSubmit = (e) => {
        //Evitamos recargar la página

        if(!message)return
        //Enviamos el mensaje sólo si se ha establecido un nickname
        if (nickname !== "") {
            //Limpiamos el mensaje
            setMessage("");

            //Petición http de tipo POST para guardar el mensaje:

            const body = {
                text: message,
                from: nickname,
            };
            const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"

            fetchSupreme('/publicMessage','POST',body, false,undefined)
            /*
            fetch(`${URL_API}/publicMessage`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
            });
            */
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


            {/* ------------- WINDOW CHAT ------------- */}
            <div ref={chat} className={styles.window}>

                {storedMessages.map((message, index) => (
                    <>
                        <div
                            key={index}
                            className={`${styles["message-row"]} ${message.from === nickname ? styles.end : styles.start
                                }`}
                        >
                            <div
                                className={`${styles.message} ${message.from === nickname
                                    ? styles["bg-self-blue"]
                                    : styles["bg-light-blue"]
                                    }`}
                            >
                                <Badge className={`${message.from === nickname
                                    ? styles.badgeblack
                                    : styles.badge}`}
                                >{message.hour}
                                </Badge>
                                {message.from}: {message.text}
                            </div>

                        </div>

                    </>
                ))}


                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles["message-row"]} ${message.from === "Yo" ? styles.end : styles.start
                            }`}
                    >
                        <div
                            className={`${styles.message} ${message.from === "Yo"
                                ? styles["bg-self-blue"]
                                : styles["bg-light-blue"]
                                }`}
                        >

                            <Badge className={`${message.from === "Yo"
                                ? styles.badgeblack
                                : styles.badge}`}
                            >{message.hour}
                            </Badge>
                            {message.from}: {message.text}
                        </div>
                    </div>
                ))}


            </div>
            <div className={styles["top-card"]}>

                <div
                    className={`${styles["nickname-row"]} ${disabled ? styles.disabled : ""
                        }`}
                >

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
        </div>
    );
};

export default PublicChat;
