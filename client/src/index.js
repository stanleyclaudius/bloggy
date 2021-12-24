import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReduxProvider from './redux/store';
import './styles/css/main.css';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);