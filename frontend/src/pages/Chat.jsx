import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import styled from 'styled-components';

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  useEffect( ()=> {
    if(!localStorage.getItem('userData')) {
      navigate('/login');
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData.isAvatarImageSet) {
      navigate('/set-avatar')
    }
  },[]);
  useEffect(()=> {
    fetchAllUsers();
  },[]);
  const fetchAllUsers = async () => {
    let res = await axios.get(getAllUsers);
    res = res.data;
    setContacts(res.users);
  }
  const handleChatChange = async () => {
    
  }
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat