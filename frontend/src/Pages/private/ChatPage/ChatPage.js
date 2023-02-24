import { useEffect, useState, useRef } from 'react';
import { useSkuadLackContext } from '../../../contexts/skuadLack-context';
import fetchSupreme from '../../../utils/apiWrapper';
import styles from './ChatPage.module.css';
import classnames from 'classnames';
import AutoTextArea from './AutoTextArea/autoTextArea';
import Message from './Message/Message';
import { useSocket } from '../../../contexts/useSocket';
import CircleAvatar from '../../../Componentes/circleAvatar/circleAvatar';
import CircleAvatarUsers from '../../../Componentes/circleAvatar/circleAvatarUsers';
//import { isBefore } from 'date-fns';
const ChatPage = ()=> {

    const {joinChat, onMessageReceived} = useSocket();

    const [currentChat, setCurrentChat] = useState();
	const [refresh, setRefresh] = useState(true);
    const [messages, setMessages] =  useState([]);
    const [messageBody, setMessageBody] = useState('');

    const {chats, myOrganizaciones, idOrganizacionActual, myUserName, idUser, organizacionActual, userOfOrganizacionActual} = useSkuadLackContext();
    const handleMessageBody = (e) => {
		setMessageBody(e.target.value);
	}

    const stringToColour = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
      }

    const handleSendMessage = (evt) => {
		if (evt.keyCode === 13 && !evt.shiftKey) {
			evt.preventDefault();
			fetchSupreme('/message','POST', {chat: currentChat._id, text: messageBody}).then(() => {
				setMessageBody('');
				setRefresh(true);
			});
		}
	}

    useEffect(() => {
        if(chats.length > 0){
            setCurrentChat({...chats[0]})
        }else{
            setCurrentChat(undefined);
        }
    }, [chats, idOrganizacionActual]);

    useEffect(() => {
        if(currentChat){
            fetchSupreme('/message', 'GET', undefined, true, {chat: currentChat._id}).then(res => {
                res.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA
                });

                setMessages(res);
                setRefresh(false);
            });
        }else{
            setMessages([]);
        }
    },[currentChat, refresh, idOrganizacionActual]);

    useEffect(() => {
        if(currentChat){
            joinChat(currentChat._id);
            onMessageReceived((newMessage) => {
                console.log('message received');
                if(newMessage.chat === currentChat._id){
                    setRefresh(true);
                }
            });
        }
    },[currentChat])

    const messagesEndRef = useRef()

	const scrollToBottom = () => {
		if(messagesEndRef && messagesEndRef.current){
			messagesEndRef.current.scrollTop = messagesEndRef?.current?.scrollHeight ;
		}
	}

	useEffect(scrollToBottom, [messages, messagesEndRef]);


    return <div className={styles.root}>
        <div className={styles.orgsRoot}>
            {myOrganizaciones?.map(org => (
            <div>
                <CircleAvatar  name={org.OrgName} path={'/skuadlack/'} id={org._id} color={stringToColour(org.OrgName)} size={40}/>
            </div>))}
        </div>
        <div className={styles.chatsRoot}>
            <h4>{organizacionActual.OrgName}</h4>
            <h2 className={styles.chatsTitle}>
                Chats
            </h2>
            {chats.map(chat => (
            <div 
                className={classnames(styles.chat, {
                    [styles.focusedChat]: chat._id === currentChat?._id
                })}
                onClick={() => setCurrentChat(chat)}
            >
                
                {chat.name? chat.name : chat.user.map(u=> u.userName).filter(item=> item !== myUserName).join(' | ')}
            </div>))}
        </div>
        <div className={styles.chatWindow}>
            {currentChat  && (
                <>
                    <h5 className={styles.chatHeader}>
                        {currentChat.name ? currentChat.name : currentChat.user.map(u=> u.userName).filter(item=> item !== myUserName).join(' | ')}
                    </h5>
                    
                    <div className={styles.wrapper}>
                        <div className={styles.messages} ref={messagesEndRef}>
                            {messages.map(message => <Message message={message}/>)}
                        </div>
                        <div className={styles.area}>
                            {currentChat && <AutoTextArea placeholder="Write a message..." value={messageBody} onChange={handleMessageBody} onKeyDown={handleSendMessage}/>}
                        </div>
                    </div>
                </>
            )}
            
        </div>
        <div className={styles.listUserRoot}>
        <h2 className={styles.usersTitle}>
                Users
            </h2>
            {userOfOrganizacionActual.map(user => (
            <div className={styles.usersRoot}
            onClick={()=> console.log(user.userName)} >
                <CircleAvatarUsers name={user.userName} id={user._id} size={40} color={stringToColour(user.name)}/>
                {user.userName}
            </div>))}
        </div>
       
    </div>
};

export default ChatPage