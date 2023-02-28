import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import fetchSupreme from "../utils/apiWrapper"
import { getUserSession, } from "../utils/localStorageUtils"

export const SkuadLackContext = createContext()

export const SkuadLackContextProvider = (props) => {
    // Creamos todas las variables de estado que necesitemos y funciones
    const params = useParams()
    const idOrganizacionActual = params.id
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
        refreshContext
    };

    return (
        <SkuadLackContext.Provider value={value}>
            {props.children}
        </SkuadLackContext.Provider>
    )

}
export const useSkuadLackContext = () => useContext(SkuadLackContext)