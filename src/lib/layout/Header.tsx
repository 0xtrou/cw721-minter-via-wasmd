'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import type { IdTokenClaims } from '@logto/react';
import { useLogto } from '@logto/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

import { LogtoRedirectURL } from '~/lib/registry/constant';

const Header = () => {
  const {
    signIn,
    signOut,
    isAuthenticated,
    getIdTokenClaims,
    fetchUserInfo,
    getAccessToken,
  } = useLogto();
  const [user, setUser] = useState<IdTokenClaims>();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const userData = await fetchUserInfo();
        setUser(userData);
        const accessToken = await getAccessToken(
          'https://workspace.app.seitrace.com/api'
        );
        console.log(accessToken);
      }
    })();
  }, [getIdTokenClaims, isAuthenticated, fetchUserInfo, getAccessToken]);

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
        {isAuthenticated ? (
          <Flex alignItems="center">
            <Menu>
              <MenuButton as={Button}>
                <Flex alignItems="center">
                  <Text as="span">{user?.email || user?.name}</Text>
                  <Avatar
                    size="sm"
                    marginLeft={2}
                    bg="gray.500"
                    color="white"
                    src={user?.picture || undefined}
                    name={user?.name || ''}
                  />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => signOut(LogtoRedirectURL)}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Button onClick={() => signIn(LogtoRedirectURL)}>Sign In</Button>
        )}
      </Box>

      <Box marginLeft={4}>
        <ConnectButton accountStatus="address" />
      </Box>
    </Flex>
  );
};

export default Header;
