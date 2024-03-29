import React from 'react';
import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import SetAvatar from './pages/SetAvatar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/set-avatar' element={<SetAvatar/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App