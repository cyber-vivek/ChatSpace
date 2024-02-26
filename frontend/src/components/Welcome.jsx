import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Welcome({userInfo}) {
  return (
    <Container>
      <img src='/robot.gif' alt="" />
      <h1>
        Welcome, <span>{userInfo.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;