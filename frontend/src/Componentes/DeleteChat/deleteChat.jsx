import React from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import fetchSupreme from "../../utils/apiWrapper";
import styles from './deleteChat.module.css'
import { BsTrash } from "react-icons/bs";

const DeleteChat = (props) =>{

    //paso por props el chatId por que por el contexto parece que no funciona bien
    const {setRefreshContext,refreshContext} = useSkuadLackContext();
    const chatId = props.currentChat._id
    let path
    props.currentChat && props.currentChat.name 
    ?(path="deleteChannel")
    :(path="deleteChat")

    const handleOnClick = ()=>{

        (chatId && fetchSupreme(`/${path}/${chatId}`,'DELETE',undefined,true,undefined)
        .then((res)=>{
            setRefreshContext(!refreshContext)
            console.log('delete refresh', refreshContext)
        }))

    }
    
    return(
            <BsTrash className={styles.botonDelete} onClick={()=>handleOnClick()}/>
       
    )
}

export default DeleteChat