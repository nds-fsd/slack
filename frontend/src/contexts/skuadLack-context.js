import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import fetchSupreme from "../utils/apiWrapper"
import { getUserSession, } from "../utils/localStorageUtils"

export const SkuadLackContext = createContext()

export const SkuadLackContextProvider = (props) => {
    // Creamos todas las variables de estado que necesitemos y funciones
    const params = useParams()
    const [idOrganizacionActual, setIdOrganizacionActual] = useState(params.id) 
    const idUser = getUserSession().id;
    const [user, setUser] = useState("")
    const [myOrganizaciones, setMyOrganizaciones] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const [chats, setChats] = useState([])
    const [chatIds, setChatIds] = useState([''])
    const [myUserName, setMyUserName] = useState("");
    const [organizacionActual, setorganizacionActual] = useState("")
    const [chatId, setChatId] = useState('');
    const [room, setRoom] = useState(idOrganizacionActual);
    const [userOfOrganizacionActual, setUserOfOrganizacionActual] = useState([])
    const [refreshContext, setRefreshContext] = useState(false)
    const [channels, setChannels] = useState([])
    const [channelIds, setChannelIds] = useState([])

    //preparamos todas las request necesarias para dejar el contexto preparado y que este todo disponible para todos los
    //componentes que consumen de el
    useEffect(() => {
        fetchSupreme(`/userOrg/${idUser}`, 'GET', undefined, true, undefined)
            .then((res) => {
                setUser(res.user);
                setMyOrganizaciones(res.organizacion);
                setMyUserName(res.user.userName)

            });


        fetchSupreme("/userChats", "GET", undefined, true, `idOrganizacion=${idOrganizacionActual}&idUser=${idUser}`
        ).then((res) => {
            setUserNames(res.userNames);
            setChats(res.chats)
            setChatIds(res.chatIds)

        });

        fetchSupreme(`/organizacion/${idOrganizacionActual}`, "GET", undefined, true, undefined)
            .then((res) => {
                setorganizacionActual(res)
                setChatId('')
                setRoom(res._id)

            })

        fetchSupreme(`/organizacionUsers/${idOrganizacionActual}`, "GET", undefined, true, undefined)
            .then((res) => {
                setUserOfOrganizacionActual(res)
               

            })
            fetchSupreme("/userChannels", "GET", undefined, true, `idOrganizacion=${idOrganizacionActual}&idUser=${idUser}`
            ).then((res) => {
                
                setChannels(res.channels)
                setChannelIds(res.channelIds)
    
            });

    }, [idOrganizacionActual, refreshContext]);



    //pasamos por value las variables a "compartir".
    const value = {
        user,
        myOrganizaciones,
        idUser,
        myUserName,
        chats,
        userNames,
        chatIds,
        organizacionActual,
        idOrganizacionActual,
        setChatId,
        chatId,
        room,
        setRoom,
        userOfOrganizacionActual,
        setChats,
        setRefreshContext,
        refreshContext,
        setIdOrganizacionActual,
        channels
        
    };

    return (
        <SkuadLackContext.Provider value={value}>
            {props.children}
        </SkuadLackContext.Provider>
    )

}
export const useSkuadLackContext = () => useContext(SkuadLackContext)