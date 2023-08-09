import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import loginService from "../../services/loginService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './Login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async (event) => {
    // Perform login logic
    // Navigate to the desired endpoint after successful login

    event.preventDefault()
    try {
      const response = await loginService.login({
        username, password,
      })

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name)
      history.push('/whiteboard');

    } catch (exception) {
        // show in a pop up
        toast.error('Invalid credentials', {
          position: toast.POSITION.TOP_CENTER,
        });    
    }

  };

  return (
    <div className="login-outer-container">
      <div className="login-inner-container">
        <h1 className="heading">Log In</h1>
        <div>
          <input 
            placeholder="Username" 
            className="login-input" 
            type="text" 
            required
            onChange={({target}) => setUsername(target.value)} 
          />
        </div>
        <div>
            <input 
                placeholder="Password" 
                className="login-input mt-20" 
                type="password" 
                onChange={({target}) => setPassword(target.value)} 
                required
            />
        </div>
        <Link onClick={handleLogin} to={`/whiteboard`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}