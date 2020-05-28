import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  //strictmode is a dev tool, does not affect production build
  <React.StrictMode>  
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

