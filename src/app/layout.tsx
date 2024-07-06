'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { LogtoProvider } from '@logto/react';
import type { ReactNode } from 'react';

import Layout from '~/lib/layout';
import ChakraProvider from '~/lib/providers/Chakra.provider';
import WalletProvider from '~/lib/providers/Wallet.provider';
import { logtoConfig } from '~/lib/registry/constant';

export const dynamic = 'force-static';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <WalletProvider>
            <LogtoProvider config={logtoConfig}>
              <Layout>{children}</Layout>
            </LogtoProvider>
          </WalletProvider>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
