import styles from "./chatPublic.module.css"
import URL from '../../utils/constants.js'
import {useState, useEffect} from 'react'


const PublicChat = ({socket}) =>{
    const [storedMessages, setStoredMessages] = useState([]);

    //Carga inicial del histórico de conversación pública
    useEffect(()=>{

        fetch(URL + 'getPublicMessage')
        .then((res)=>res.json())
        .then ((res)=>{
            //es res.messages por que en el backend está definidos así en la respuesta
            setStoredMessages(res.messages)
        });


    },[]);



    return(
        <div>





        </div>
    )
}

export default ChatPublic