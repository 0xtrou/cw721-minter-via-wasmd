'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ReactNode } from 'react';

import { ChakraProvider as Chakra } from '@chakra-ui/react'

const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider>
      <Chakra>{children}</Chakra>
    </CacheProvider>
  );
};

export default ChakraProvider;
