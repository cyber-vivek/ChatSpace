import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import {toast} from 'react-toastify';
import { toastOptions } from "../utils/constants";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully', toastOptions )
    navigate('/login');
  };
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;