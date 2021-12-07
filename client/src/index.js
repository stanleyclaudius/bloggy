import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReduxProvider from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);