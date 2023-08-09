import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import loginService from "../../services/loginService";

import './Login.css';

export default function SignIn() {
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

      console.log(response.data);
      localStorage.setItem('token', response.data);
      history.push('/whiteboard');

    } catch (exception) {
        console.log("Invalid credentials");
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