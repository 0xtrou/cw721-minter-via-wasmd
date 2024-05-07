import { Box, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Box>
        <Box as="h1" fontSize="3xl" fontWeight="bold">
          Mint CW721 Via Wasmd
        </Box>
        <Box as="p" fontSize="md" color="gray.400">
          Mint your own NFTs over a pointer
        </Box>
      </Box>
      <Box marginLeft="auto">
        <ConnectButton accountStatus="address" />
      </Box>
    </Flex>
  );
};

export default Header;
