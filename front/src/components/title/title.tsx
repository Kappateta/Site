import React from 'react';

import { 
  Heading,
  Stack,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react'


function Site() {
    return (
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'300px 1fr'}
        h='650px'
        gap='1'
        color='black.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'header'}>
        <Center bg='orange.300' h='30px' color='Black' marginTop={3} fontSize={30}>
          Uplays
        </Center>

        </GridItem>
        <GridItem pl='2' bg='yellow.300' area={'nav'}>
          Menu
        </GridItem>
        <GridItem pl='2' bg='green.300' area={'main'}>
          Main
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    );
  }
  
export default Site;