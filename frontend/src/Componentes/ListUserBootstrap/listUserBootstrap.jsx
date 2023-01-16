import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./listUserBootstrap.module.css"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';



const ListUsersBootstrap = () => {
    const [list, setList] = useState([]);
    let contador = 0;

    useEffect(() => {
        fetch("http://localhost:3001/user")
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                setList(res);
            })
        console.log('Acabado el fetch');
    }, list)

    const alertBootstap = () =>{
        <>
        <Alert variant='danger'>Usuario eliminado con éxito</Alert>
        </>
    }

    const deleteUser = (datosTabla) => {
        const url = "http://localhost:3001/user/" + datosTabla
        const options = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        };
        fetch(url, options)
            .then((res) => {
                res.json();
            })
            .then(() => {
                //alert(`Usuario  eliminado.`)
                alertBootstap(); //No funciona
                
                
            });
    }

    return (
        <div className={styles.listadoTablaBootstrap}>
            <Table className={styles.tablaDark} size="sm" triped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Id</th>
                        <th>Contraseña</th>
                        <th>Nombre de usuario</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th className={styles.thBotones}>Editar</th>
                        <th className={styles.thBotones}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>

                    {list && list.map((datosTabla) => (

                        <tr>
                            <td> {contador += 1}</td>
                            <td> {datosTabla._id}</td>
                            <td> {datosTabla.password}</td>
                            <td> {datosTabla.userName}</td>
                            <td> {datosTabla.email}</td>
                            <td> {datosTabla.name}</td>
                            <td> {datosTabla.lastName}</td>
                            <td className={styles.botones}><Link to={`../user/${datosTabla._id}`}><Button variant="light" className={styles.butEdit}>Editar</Button></Link></td>
                            <td className={styles.botones}><Button variant="danger" onClick={() => deleteUser(datosTabla._id)} className={styles.butEliminar}>Eliminar</Button></td>
                        </tr>


                    ))}
                </tbody>

            </Table>
        </div>
    )
}

export default ListUsersBootstrap