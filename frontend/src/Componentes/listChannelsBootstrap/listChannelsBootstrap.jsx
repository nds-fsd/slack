import React, { useEffect, useState } from "react";
import styles from "./listChannelsBootstrap.module.css"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import fetchSupreme from "../../utils/apiWrapper";



const ListChannelsBootstrap = () => {
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const deleteChannel = (data) => {
        fetchSupreme(`/deleteChannel/${data._id}`, 'DELETE', undefined, true, undefined)
            .then(() => {
                setRefresh(true);
            });
    }

    useEffect(() => {
        if (refresh) {
            fetchSupreme('/allChannels', 'GET', undefined, true, undefined)
                .then((res) => {
                    setList(res);
                    setRefresh(false);
                })
        }
    }, [refresh])

    return (
        <>
            <h1 className={styles.title}>Channels</h1>
            <div className={styles.listadoTablaBootstrap}>

                <Table className={styles.tablaDark} size="sm" bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Id</th>
                            <th>Owner Organizacion</th>
                            <th>Nombre</th>
                            <th>Usuarios</th>
                            <th>Fecha Creación</th>
                            <th className={styles.thBotones}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {list && list.map((data, index) => (
                            <tr key={data._id + '_list_user'}>
                                <td> {index + 1}</td>
                                <td> {data._id}</td>
                                <td> {data.organizacion.OrgName}</td>
                                <td> {data.name}</td>
                                <td> {data.user.map((e) => e.userName).join(" | ")}</td>
                                <td> {new Date(data.createdAt).toLocaleDateString()}</td>
                                <td className={styles.botones}><Button id={styles.botonEliminar} variant="danger" onClick={() => deleteChannel(data)} className={styles.butEliminar}>Eliminar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ListChannelsBootstrap