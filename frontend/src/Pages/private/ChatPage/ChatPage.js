import { useEffect, useState, useRef } from "react";
import { useSkuadLackContext } from "../../../contexts/skuadLack-context";
import fetchSupreme from "../../../utils/apiWrapper";
import styles from "./ChatPage.module.css";
import classnames from "classnames";
import AutoTextArea from "./AutoTextArea/autoTextArea";
import Message from "./Message/Message";
import { useSocket } from "../../../contexts/useSocket";
import CircleAvatar from "../../../Componentes/circleAvatar/circleAvatar";
import CircleAvatarUsers from "../../../Componentes/circleAvatar/circleAvatarUsers/circleAvatarUsers";
import CreateNewChatWithUsers from "../../../Componentes/CreateNewChatWithUsers/createNewChatWithUsers.jsx";
import DeleteChat from "../../../Componentes/DeleteChat/deleteChat";
import NotificacionNuevoMensaje from "../../../Componentes/NotificacionNuevoMensaje/notificacionNuevoMensaje";
import stringToColour from "../../../utils/stringToColour";

const ChatPage = () => {
  const { socket, joinChat, onMessageReceived, setAlert, alert } = useSocket();

  const [currentChat, setCurrentChat] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [infoNotification, setInfoNotification] =useState('')

  const {
    idUser,
    chats,
    myOrganizaciones,
    idOrganizacionActual,
    myUserName,
    organizacionActual,
    
    userOfOrganizacionActual
  } = useSkuadLackContext();
  
  const setTimerNewMessage = (chatId) => { 
    //objetivo: No quiero ver la notificación si ya estoy en el chat que se emite el mensaje
    //Con este condicional, nos echa de la función si se cumple la condición
    if(currentChat._id === chatId) return

      setShowNewMessage(true);
      setTimeout(() => {
        setShowNewMessage(false);
      }, [5000]);
      console.log("paso por setTimer");
  };


  const handleMessageBody = (e) => {
    setMessageBody(e.target.value);
  };

  const handleSendMessage = (evt) => {
    if (evt.keyCode === 13 && !evt.shiftKey) {
      evt.preventDefault();
      //socket.emit('notification',{chat:currentChat._id, user:myUserName})
      //console.log('paso por emit de notification')  //AQUIIII
      fetchSupreme("/message", "POST", {
        chat: currentChat._id,
        text: messageBody,
      }).then(() => {
        setMessageBody("");
        setRefresh(true);
      });
      socket.emit('notification', {chat: currentChat._id, text: messageBody, userName: myUserName, idUser: idUser })
    }
  };

  useEffect(() => {
    if (chats.length > 0) {
      setCurrentChat(chats[0]);
    } else {
      setCurrentChat(undefined);
    }
  }, [chats, idOrganizacionActual]);

  useEffect(() => {
    if (currentChat) {
      fetchSupreme("/message", "GET", undefined, true, {
        chat: currentChat._id,
      }).then((res) => {
        res.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setMessages(res);
        setRefresh(false);
      });
    } else {
      setMessages([]);
    }
  }, [currentChat, refresh, idOrganizacionActual]);

  useEffect(() => {
    if (currentChat) {
      joinChat(currentChat._id);
      onMessageReceived((newMessage) => {
        console.log("message received", newMessage);
        if (newMessage.chat === currentChat._id) {
          setRefresh(true);
        }
      });
    }
  }, [currentChat]);

  useEffect(() => {
    
    const chatReply = (data) =>{
      console.log('data de la respuesta', data)
      
      setInfoNotification({userName:data.userName, idChat: data.chat,text:data.text})

      console.log('info Notificacion', infoNotification)
      
      const {chat} = data 
      console.log('data',data)
      setTimerNewMessage(chat)
    }
    socket.on('reply2', chatReply)

    return () => {
      socket.off('reply2', chatReply)
    }
  })


  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef?.current?.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages, messagesEndRef]);

  return (
    <div className={styles.root}>
      {showNewMessage && <NotificacionNuevoMensaje infoNotification = {infoNotification}/>}
      <div className={styles.orgsRoot}>
        {myOrganizaciones?.map((org) => (
          <div>
            <CircleAvatar
              key={org._id}
              name={org.OrgName}
              path={"/skuadlack/"}
              id={org._id}
              color={stringToColour(org.OrgName)}
              size={40}
            />
          </div>
        ))}
      </div>
      <div className={styles.chatsRoot}>
        <h4>{organizacionActual.OrgName}</h4>
        <h2 className={styles.chatsTitle}>
          <div className={styles.chatCreateButton}>
            <div>Chats</div>
            <div>
              <CreateNewChatWithUsers />
            </div>
          </div>
        </h2>
        <div className={styles.chatSpace}>
        {chats.map((chat) => (
          <div
            className={classnames(styles.chat, {
              [styles.focusedChat]: chat._id === currentChat?._id,
            })}
            onClick={() => setCurrentChat(chat)}
          >
            {chat.name
              ? chat.name
              : chat.user
                  .map((u) => u.userName)
                  .filter((item) => item !== myUserName)
                  .join(" | ")}
          </div>
        ))}
        </div>
      </div>
                
      <div className={styles.chatWindow}>
        {currentChat && (
          <>
            <h5 className={styles.chatHeader}>
              {currentChat.name
                ? currentChat.name
                : currentChat.user
                    .map((u) => u.userName)
                    .filter((item) => item !== myUserName)
                    .join(" | ")}
            
            <DeleteChat currentChat={currentChat} />
            </h5>
            
                
            <div className={styles.wrapper}>
              <div className={styles.messages} ref={messagesEndRef}>
                {messages.map((message) => (
                  <Message message={message} />
                ))}
              </div>
              <div className={styles.area}>
                {currentChat && (
                  <AutoTextArea
                    placeholder="Write a message..."
                    value={messageBody}
                    onChange={handleMessageBody}
                    onKeyDown={handleSendMessage}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.listUserRoot}>
    
        <h2 className={styles.usersTitle}>Users</h2>
        {userOfOrganizacionActual.map((user) => (
          <div
            className={styles.usersRoot}
            onClick={() => console.log(user.userName)}
          >
            <CircleAvatarUsers
              name={user.userName}
              id={user._id}
              size={40}
              color={stringToColour(user.name)}
            />
            {user.userName === myUserName? myUserName + '(tú)' : user.userName }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
