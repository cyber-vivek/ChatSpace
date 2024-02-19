import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      username: "",
      password: "",
    });
    const toastOptions = {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
  
    useEffect(()=> {
      if(localStorage.getItem('userData')) {
        navigate('/');
      }
    }, []);
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const {username, password} = values;
      let res = await axios.post(loginRoute, {
        username, 
        password
      });
      res = res.data;
      if(!res.status) {
        toast.error(res.message, toastOptions);
      } else {
        toast.success(res.message, toastOptions);
        localStorage.setItem('userData', JSON.stringify(res.user));
        navigate('/');
      }
    };
  
    return (
      <>
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img src="/logo.svg" alt="logo" />
              <h1>Chat Space</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={(e) => handleChange(e)}
              required
            />
            <button type="submit">Login</button>
            <span>
              Need an account ? <Link to="/register">Register.</Link>
            </span>
          </form>
        </FormContainer>
      </>
    );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
overflow-y: auto;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;

export default Login