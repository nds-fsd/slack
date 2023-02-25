import React from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import fetchSupreme from "../../utils/apiWrapper";
import Button from 'react-bootstrap/Button';

const DeleteChat = (props) =>{

    //paso por props el chatId por que por el contexto parece que no funciona bien
    const {setRefreshContext,refreshContext} = useSkuadLackContext();
    let chatId
    props.currentChat && (chatId = props.currentChat._id)

    const handleOnClick = ()=>{

        (chatId && fetchSupreme(`/deleteChat/${chatId}`,'DELETE',undefined,true,undefined)
        .then((res)=>{
            setRefreshContext(!refreshContext)
        }))

    }
    
    return(
            <Button variant="light" onClick={()=>handleOnClick()}>Delete Chat</Button>
       
    )
}

export default DeleteChat