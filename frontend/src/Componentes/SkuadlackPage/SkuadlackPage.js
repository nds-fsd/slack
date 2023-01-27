import React from 'react'
import styled from 'styled-components'

export const SkuadlackPage = () => {
  return (
    <PageStyle>
    <div>
        <h1>Proximamente...</h1>
        <img src='https://www.computerworld.es/archivos/202011/slack.jpg' alt='imagen'/>

    </div>
    </PageStyle>
  )
}
const PageStyle = styled.div`

    display: block;
    justify-content: center;
    text-align: center;
    padding-top: 5rem;
    color : #f2f2f2;
    max-height: fit-content;

img{
    padding: 1rem;
    width: 60%;
    height: 50%;
}
`

