import Site from './components/title/title'
import ButtonLogin from './components/buttonLogin/button'

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Site/>
    </ChakraProvider>
  );
}

export default App;
