import React from 'react'
import styled from 'styled-components'

export const SkuadlackPage = () => {
  return (
    <PageStyle>
    <div className='barrasuperior'>
      <div>nombre org</div>
      <div>buscador canales+chat</div>
      <div>fotoPerfil</div>

    </div>
    <div className='cuerpo'>

        <div className='box1'>
          <div className='Org'>Organizaciones</div>
          <div className='AddOrg'>+</div>
        </div>
        
        <div className='box2'>infOrg + chats + canales</div>
        <div className='box3'>chats abiertos</div>
    </div>
    </PageStyle>
  )
}
const PageStyle = styled.div `


    display: block;
    justify-content: center;
    text-align: center;
    color : #f2f2f2;
    max-height: fit-content;





.barrasuperior{
  height: 8vh;
  background-color: #090a0f;
  z-index: 2000;
  color: #f2f2f2;
  width: 100%;
  padding: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
 
}




.cuerpo{
  display: flex;
  flex-direction: row;
  height: 92vh;
  width: 100%;
  margin: 0;
  

  .box1{

    padding: .3rem;
    background-color: red;
    height: 100%;
    width: 5%;
    text-align: center;
    color: #090a0f;
    font-size: x-large;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .Org{
      height: 50%;
      word-wrap: break-word;
    }
  }
  .box2{
    position:static;
    padding: 1rem;
    height: 100%;
    width: 30%;
    overflow: hidden;
  }
  .box3{
    padding: 1rem;
    background-color: #f2f2f2;
    height: 100%;
    width: 65%;
    color: #090a0f;
  }
}
`

