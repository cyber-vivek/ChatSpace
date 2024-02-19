import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    if(!localStorage.getItem('userData')) {
      navigate('/login');
    }
  },[])
  return (
    <div>Chat</div>
  )
}

export default Chat