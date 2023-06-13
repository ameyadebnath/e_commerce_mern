import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
        <App/>
      </BrowserRouter>
  
)

reportWebVitals();



