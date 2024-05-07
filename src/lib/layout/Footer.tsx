import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="https://solo.engineer" isExternal rel="noopener noreferrer">
          0xtrou
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
