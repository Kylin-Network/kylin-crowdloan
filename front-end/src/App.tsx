import React from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Header } from './components/Header';
import { Content } from './components/Content';
import { WalletProvider } from './components/WalletProvider';
import { createBreakpoints } from "@chakra-ui/theme-tools"

import { extendTheme } from "@chakra-ui/react"

console.log(process.env.NODE_ENV);


const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  breakpoints,
  config:{
    initialColorMode: 'dark'
  },
  styles: {
    global: {
      body: {
        bg: 'black'
      }
    }
  },
  colors: {
    pink: {
      '50': '#EA429B',
      '100': '#EF238F',
      '200': '#E6007A',
      '300': '#E6007A',
      '400': '#E6007A',
      '500': '#E6007A',
      '600': '#E6007A',
      '700': '#E6007A',
      '800': '#E6007A',
      '900': '#E6007A'
    }
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </WalletProvider>
    </ChakraProvider>
  );
}

export default App;
