import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReduxProvider from './redux/store';

const config = {
  initialColorMode: 'dark'
}

const theme = extendTheme({config});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);