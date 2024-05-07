import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import Layout from '~/lib/layout';
import ChakraProvider from '~/lib/providers/Chakra.provider';
import WalletProvider from '~/lib/providers/Wallet.provider';

type RootLayoutProps = {
  children: ReactNode;
};

const APP_NAME = 'nextarter-chakra';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | nextarter-chakra' },
  description: 'Next.js + chakra-ui + TypeScript template',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://nextarter-chakra.sznm.dev',
    title: 'nextarter-chakra',
    description: 'Next.js + chakra-ui + TypeScript template',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-chakra.sznm.dev og-image',
    },
  },
  twitter: {
    creator: '@sozonome',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
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
