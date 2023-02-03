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
          <div className='AddOrg'>+</div>
          <div className='Org'>Organizaciones</div>
          <div className='AddOrg'>+</div>
        </div>

        <div className='box2'>
          <div className='chatbox'>infOrg</div>
          <div className='chatbox'>canales </div>
          <div className='chatbox'>chats</div>

        </div>

        <div className='box3'>

          <div className='barraSuperiorChat'>
            <div>nombre chat/user(s) con el que hablas</div>
            <div>opciones </div>
          </div>

          <div className='bodyChat'>chat/canal abierto</div>

          <div className='barraSuperiorChat'>
            <div>input texto</div>
            <div>enviar </div>
          </div>
        </div>


        <div className='box1'>
          <div className='AddOrg'>+</div>
          <div className='Org'>users conectados</div>
          <div className='AddOrg'>+</div>
        </div>
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
    overflow: hidden;

    .Org{
      height: 80%;
      word-wrap: break-word;
    }
    .AddOrg{
      height: 10%;
    }
  }
  .box2{
    position:static;
    padding: .1rem;
    padding-bottom: 0.3rem;
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-align: center;

    .chatbox{
      box-shadow: 2px 2px 5px #0A0A0B, -2px -2px 5px #445CA3;
      width: 100%;
      height: 32%;

    }

  }
  .box3{
    padding: .2rem;
    background-color: #f2f2f2;
    height: 100%;
    width: 65%;
    color: #090a0f;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    
    .barraSuperiorChat{
      height: 8vh;
      background-color: green;
      color: #f2f2f2;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      overflow: hidden;
      align-items: center;
      padding: 1rem;
    }
    .bodyChat{
      background-color: yellowgreen;
      height: 100%;


    }
  
  }
}
`

