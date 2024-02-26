import React, { useEffect, useRef, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
import { getAllUsers, userDetailsRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import styled from 'styled-components';
import axiosHttp from '../utils/requestInterceptor';
import LoadingScreen from '../components/LoadingScreen';

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const socket = useRef();
  const navigate = useNavigate();
  const newUserMessage = new Audio('/new-user-message.mp3');

  useEffect(()=> {
    getUserDetails();
  },[]);

  const getUserDetails = async () => {
    let res = await axiosHttp.get(userDetailsRoute);
    res = res.data;
    if(!res.userDetails.isAvatarImageSet) {
      navigate('/set-avatar');
      return;
    }
    setUserDetails(res.userDetails);
    fetchAllUsers();
  }

  useEffect(() => {
    if(userDetails) {
      setUpSocket();
    }
  },[userDetails])

  const setUpSocket = () => {
    socket.current = io(host);
    if(socket.current) {
      socket.current.emit('add-user', userDetails._id);
      socket.current.on('message-recieve', (message) => {
        setArrivedMessage(message);
      })
    }
  }

  useEffect(()=> {
    if(!arrivedMessage) return;
    if(currentChat && arrivedMessage.from === currentChat._id) return;
    handleOtherContactMessages(arrivedMessage)
  }, [arrivedMessage])

  const fetchAllUsers = async () => {
    let res = await axiosHttp.get(getAllUsers);
    res = res.data;
    res.users?.forEach(user => {
      user.unreadCount = 0;
    })
    setContacts(res.users);
    setIsLoading(false);
  }

  const handleOtherContactMessages = (message) => {
    currentChat && newUserMessage.play();
    setContacts(prevCntacts => {
      const contacts = [...prevCntacts];
      const index = contacts.findIndex(user => user._id === message.from);
      if(index !== -1) {
        const user = contacts.splice(index, 1)[0];
        user.unreadCount += 1;
        contacts.unshift(user);
        return contacts;
      }
    })
  }

  const handleChatChange = (chat) => {
    const users = [...contacts];
    const index = users.findIndex(user => user._id === chat._id);
  if(index !== -1){
    users[index].unreadCount = 0;
    setContacts(users);
  }
    setCurrentChat(chat);
  }
  return (
    <>
    {isLoading ? <LoadingScreen/> :
      <Container>
        <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} userInfo={userDetails} />
            {!currentChat ? (
              <Welcome userInfo={userDetails} />
            ) : (
              <ChatContainer currentChat={currentChat} userInfo={userDetails} socket={socket} arrivedMessage={arrivedMessage}/>
            )}
          </div>
      </Container>
    }
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