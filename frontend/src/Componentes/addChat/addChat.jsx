import React, { useEffect, useState } from "react";
import fetchSupreme from "../../utils/apiWrapper";
import styles from "./addChat.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { getUserSession } from "../../utils/localStorageUtils";
import { useParams } from "react-router-dom";

const AddChat = () => {
  const [userData, setUserData] = useState([]);
  const params = useParams()
  const idOrganizacionActual =params.id
  const idUser = getUserSession().id
  const[arrayChatUser, setArrayChatUser] =useState([])



  useEffect(() => {
    fetchSupreme(`/user/${idUser}`, "GET", undefined, true, undefined)
    .then((res) => {
        const arrayDataChats = res.chat
        const arrayUsers =[];
        const arrayChatFound = [];
        //console.log('arrayDataChats',arrayDataChats);

        arrayDataChats.map((e)=>{
          //console.log('elemento', e);
          if(e.organizacion === idOrganizacionActual){
              
                arrayUsers.push(e.user)

                console.log('arrayUsersEncontrados', arrayUsers);

                arrayUsers.map((ele)=>{

                  ele = ele.toString()  

                  console.log('ele', ele)
                  console.log('e' ,e._id)
                  console.log('idUser', idUser)

                  if(ele === idUser){
                    console.log('e.id', e.id)
                    setUserData([...userData, e._id])
                  }
                })
          }
        })   
    });
  }, []);

  
console.log('datos usuario useEffect', userData)

const getChatsUser = ((responseUserChats, idOrganizacion)=>{

  let arrayChatsUser = []

  //const arrayChats = responseUserData.chat

  const arrayMappingOrganizaciones = responseUserChats.map((e)=>{
    
    //Quiero entrar solo en las organizaciones que coincidan con la que estoy actualmente
    if (e.organizacion === idOrganizacion) {

      const arrayUsers = e.user

      const usersCompare = arrayUsers.map((ele)=>{

        if(ele === idUser){

          //Aquí le meto a un array los id de los chat que contentan mi usuario y organización
          arrayChatsUser.push(e._id)
         
        }
      })
    }
  })
    return arrayChatsUser
})

//const arrayChatUser =  getChatsUser(userData, idOrganizacionActual)

//console.log('arrayChatUser', arrayChatUser)

  return (
 
    <div className={styles.contenedorChats}>

      
        {arrayChatUser.map((e)=>{
          return 
        }



        )}


    
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