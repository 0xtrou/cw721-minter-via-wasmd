'use client';

import '@rainbow-me/rainbowkit/styles.css';
import type { ReactNode } from 'react';

import Layout from '~/lib/layout';
import ChakraProvider from '~/lib/providers/Chakra.provider';
import WalletProvider from '~/lib/providers/Wallet.provider';

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
            <Layout>{children}</Layout>
          </WalletProvider>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
