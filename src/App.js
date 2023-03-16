// import logo from './logo.svg';
import './App.css';
import '@fontsource/raleway/400.css'

import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Routing from "./components/Routes";
import theme from "./theme.fonts";



function App() {
  return (
      <ChakraProvider>
        <BrowserRouter>
          <Routing/>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
