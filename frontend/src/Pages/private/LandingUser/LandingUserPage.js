import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdWavingHand, MdSettings } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import fetchSupreme from '../../../utils/apiWrapper';
import ModalRollOrg from '../../../Componentes/Modal/modalRollOrg/modalRollOrg'
import { ButtonCopied } from '../../../Componentes/buttonCopied/buttonCopy';



const LandingUserPage = () => {
    const params = useParams()
    const [user, setUser] = useState("")
    const [organizacion, setOrganizacion]= useState([""]);
    const [viewInvitation, setViewInvitation] = useState(null)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        fetchSupreme(`/userOrg/${params.id}`, 'GET', undefined, true, undefined)  
            .then((res) => {
                setUser(res.user);
                setOrganizacion(res.organizacion);
            });
    }, [refresh]);

    
    return (
        <LUPstyle>

            <div>
                <h1 className='headtitle'>¡Bienvenido <span className='rojo'>{user.userName} <MdWavingHand className='hand' /></span>
                    <ModalRollOrg setRefresh={setRefresh} refresh={refresh} />
                    <Button className='buttonChat' as={Link} to="/publicChat" variant="dark">Chat Público</Button>

                </h1>
            </div>

            <div>
                {organizacion && organizacion.map((e) => (
                    
                    <Card className='cardstyle' border="dark">
                        <Card.Header as="h5" className='cardhead'><span className='rojo'>Organizaciones SkuadLack</span> de {user.email}</Card.Header>
                        <Card.Body>
                            <div className='cardtext'>
                                <Card.Text>
                                    <h3 >{e.OrgName}</h3>
                                    
                                    <p>{e.OrgDescription}</p>
                                    
                                </Card.Text>

                            </div>

                            <div className='btncard'>
                                <Button as={Link} to={`/skuadlack/${e._id}`} variant="dark">Iniciar organización</Button>
                            </div>
                            <div className='btncard'>
                                {viewInvitation !== e._id && <Button onClick={() => setViewInvitation(e._id)} variant="danger">Invitar</Button>}
                                {viewInvitation === e._id && (
                                <>
                                    Copia este código de invitación ${e._id}
                                    <ButtonCopied id={e._id}/>
                                    <CloseButton aria-label="Hide" onClick={() => setViewInvitation(null)} variant="danger" />
                                </>)}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div>
                <Card className='cardstyle' border="dark">
                    <Card.Header as="h5" className='cardhead'>Crea tu nueva <span className='rojo'>Organizacion SkuadLack</span></Card.Header>
                    <Card.Body>
                        <div className='cardtext'>
                            <Card.Text>
                                <p>¿Quieres usar <span className='rojo'>Skuadlack</span> con un equipo distinto?</p>
                            </Card.Text>
                        </div>
                        <div className='btncard'>
                            <Button as={Link} to="/organizacion" variant="dark">Crea tu Organizacion</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className='perfiluser'>
                <h2><Link className='icono' to={`/user/${user._id}`}><MdSettings /></Link> Perfil</h2>
            </div>
        </LUPstyle>
    )
}

const LUPstyle = styled.div`
display: flex;
flex-direction: column;
justify-items: center;
justify-content: center;
text-align: center;
padding-top: 5.5rem;
background-color: #242A38 ;


.headtitle{
    text-align: start;
    padding-left: 2rem;
    font-weight: bolder;
    color: #f2f2f2;
}
.hand{
   
    margin-right: 2rem;

}

.rojo{
    color: #E65262;
}
.cardstyle{
    display: flex;
    width: 80%;
    margin: 2rem;
    text-align: start;
    font-weight: bold;
    border-style: double;


}
.cardhead{
    font-weight: bolder;
    background-color: #fbe2d7;
    

}
.card-body{
    display: flex;
    justify-content: flex-end;
    background-color: #f2f2f2;
    border-radius: 10px;


}
.btncard{
    display: flex;
    align-items: end;
    justify-content: center;
    margin-left: 6rem;
    width: 35%;
}
.cardtext{
    justify-content: flex-start;
    width: 50%;
}
.perfiluser{
    width: 90%;
    text-align: end;
    padding: 1.5rem;
    padding-left: 3rem;
    font-weight: bolder;
    color: #f2f2f2;
    align-items: baseline;
    align-content: center;
    align-content: flex-end;
    text-decoration: none;
    }
    
.icono{
    position: relative;
    color: #E65262;
    top: -.15rem;
    }
.buttonX{
    // height:15px;
    margin:auto;
} 
.buttonChat{
    margin-left:1rem
} 
.save{
    border:none;
    margin-right: 2rem
}  
`

export default LandingUserPage;