import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./listOrgBootstrap.module.css"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import fetchSupreme from "../../utils/apiWrapper";



const ListOrgBootstrap = () => {
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const navigate = useNavigate()

    const deleteOrg = (data) => {
        fetchSupreme(`/organizacion/${data._id}`, 'DELETE', undefined, true, undefined)
            .then(() => {
                setRefresh(true);
            });
    }

    useEffect(() => {
        if (refresh) {
            fetchSupreme('/organizacion', 'GET', undefined, true, undefined)
                .then((res) => {
                    setList(res);
                    setRefresh(false);
                })
        }
    }, [refresh])
    return (
        <>
            <h1 className={styles.title}>Organizations</h1>
            <div className={styles.listadoTablaBootstrap}>
                <Table className={styles.tablaDark} size="sm" bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Id</th>
                            <th>Nombre de Organización</th>
                            <th>Descripción</th>
                            <th>email</th>
                            <th className={styles.thBotones}>View</th>
                            <th className={styles.thBotones}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.map((data, index) => (
                            <tr key={data._id + '_list_organization'}>
                                <td> {index + 1}</td>
                                <td> {data._id}</td>
                                <td> {data.OrgName}</td>
                                <td> {data.OrgDescription}</td>
                                <td> {data.OrgMail}</td>
                                <td className={styles.botones}><Button id={styles.botonEditar}
                                    onClick={() => navigate(`../skuadlack/${data._id}`)}>View</Button>
                                </td>
                                <td className={styles.botones}><Button id={styles.botonEliminar} variant="danger" onClick={() => deleteOrg(data)} className={styles.butEliminar}>Eliminar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ListOrgBootstrap