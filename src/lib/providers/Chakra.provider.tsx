'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider as Chakra } from '@chakra-ui/react';
import type { ReactNode } from 'react';

const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider>
      <Chakra>{children}</Chakra>
    </CacheProvider>
  );
};

export default ChakraProvider;
