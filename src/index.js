import React from 'react';
import ReactDOM from 'react-dom/client';//Biblioteca de React para hablar con los navegadores web (React DOM)

import './index.css';//estilos para tus componentes
import App from './App';//el componnete que se creo en app.js
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
