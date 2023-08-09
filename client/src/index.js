import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
    <>
      <App />
      <ToastContainer />
    </>,
  document.getElementById('root')
);
