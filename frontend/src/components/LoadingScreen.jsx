import React from 'react'
import styled from 'styled-components'

const LoadingScreen = () => {
  return (
    <Container>
        <img src='/loader.gif' alt="loader" className="loader" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }`

export default LoadingScreen