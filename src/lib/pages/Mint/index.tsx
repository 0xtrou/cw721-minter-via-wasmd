'use client';

import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useFormik } from 'formik';
import { MintProvider } from '~/lib/providers/Mint.provider';
import { useEvmSigner } from '~/lib/providers/Wallet.provider';
import { ChainConfig, findChainRegistry } from '~/lib/registry/chains';
import { JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';

const Mint = () => {
  const { isConnected, chain } = useAccount();
  const { signer } = useEvmSigner();

  const form = useFormik({
    initialValues: {
      nativeContractAddress: '',
      tokenId: '0',
    },
    onSubmit: async values => {
      const mintProvider = new MintProvider(
        signer as JsonRpcSigner,
        findChainRegistry(chain?.id || 0) as ChainConfig
      );

      await mintProvider.handleEvmMint(values.nativeContractAddress, values.tokenId);
    },
  });


  if (!isConnected)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Text>Please connect wallet to SEI arctic-1</Text>
      </Flex>
    );

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={8}
      w="full"
    >
      <Text as={'h1'} fontSize={24} fontWeight={'bold'}>Input the information below</Text>

      <FormControl isInvalid={!!form.errors.nativeContractAddress && form.touched.nativeContractAddress} >
        <FormLabel>Contract Address (as Bech32 formatted, start with sei)</FormLabel>
        <Input {...form.getFieldProps('nativeContractAddress')} disabled={form.isSubmitting} />
        <FormErrorMessage>{form.errors.nativeContractAddress}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!form.errors.tokenId && form.touched.tokenId}>
        <FormLabel>Token Id</FormLabel>
        <Input {...form.getFieldProps('tokenId')} disabled={form.isSubmitting} />
        <FormErrorMessage>{form.errors.tokenId}</FormErrorMessage>
      </FormControl>

      <Button
        mt={4}
        colorScheme="teal"
        isLoading={form.isSubmitting}
        onClick={form.submitForm}
        type="submit"
      >
        Submit
      </Button>
    </Flex>
  );

};

export default Mint;
