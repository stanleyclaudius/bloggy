import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import ReduxProvider from './redux/store';
import './styles/css/main.css';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 2000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);