import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./listUserBootstrap.module.css"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ModalEditUser from "../Modal/modalEditUser";
import EditUser from '../editUser/editUser.js'
import { getUserToken, removeSession } from "../../utils/localStorageUtils";
import fetchSupreme from "../../utils/apiWrapper";



const ListUsersBootstrap = () => {
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [handleId, setHandleId] = useState('');
    const navigate = useNavigate()

    const deleteUser = (datosUser) => {
        // const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"
        /*
        const url = `${URL_API}/user/` + datosUser._id
        const options = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                authorization: `Bearer ${getUserToken()}`,
            }
        };
        */
        fetchSupreme(`/user/${datosUser._id}`, 'DELETE',undefined, true, undefined)
        
        /*
        fetch(url, options)
            .then((res) => {
                res.json();
            })
        */

            .then(() => {
                setRefresh(true);
                alert(`Usuario ${datosUser.userName} eliminado.`);

                //alertBootstap(); //No funciona
            });
    }


    useEffect(() => {
        if (refresh) {
            // const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"
            fetchSupreme('/user', 'GET', undefined, true,undefined)
            /*
            fetch(`${URL_API}/user`, {
                headers: {
                    authorization: `Bearer ${getUserToken()}`
                }
            })
                .then((response) => {
                    return response.json();
                })
            */
                .then((res) => {
                    setList(res);
                    setRefresh(false);
                })
            //console.log('Acabado el fetch');
        }
    }, [refresh])

    //console.log('lista usuarios', list)

    return (
        <div className={styles.listadoTablaBootstrap}>
            <Table className={styles.tablaDark} size="sm" bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Id</th>
                        <th>Nombre de usuario</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th className={styles.thBotones}>View</th>
                        <th className={styles.thBotones}>Editar</th>
                        <th className={styles.thBotones}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>

                    {list && list.map((datosUser, index) => (

                        <tr key={datosUser._id + '_list_user'}>
                            <td> {index + 1}</td>
                            <td> {datosUser._id}</td>
                            <td> {datosUser.userName}</td>
                            <td> {datosUser.email}</td>
                            <td> {datosUser.name}</td>
                            <td> {datosUser.lastName}</td>
                            <td className={styles.botones}><Button id={styles.botonEditar}
                                onClick={() => navigate(`../LUP/${datosUser._id}`)}>View</Button>{/* nuevo boton para mostrar landingPageUser*/}                            </td>
                            <td className={styles.botones}><Button id={styles.botonEditar} onClick={() => {
                                setOpenModal(true)
                                setHandleId(datosUser._id)

                            }} variant="light" className={styles.butEdit}>Editar</Button>

                            </td>

                            <td className={styles.botones}><Button id={styles.botonEliminar} variant="danger" onClick={() => deleteUser(datosUser)} className={styles.butEliminar}>Eliminar</Button></td>
                        </tr>

                    ))}
                 
                    <ModalEditUser userId={handleId} setRefresh={setRefresh} setOpenModal={setOpenModal} open={openModal} onClose={() => setOpenModal(false)}></ModalEditUser>


                </tbody>

            </Table>
        </div>
    )
}

export default ListUsersBootstrap