'use client';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import type { JsonRpcSigner } from 'ethers';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { useEvmSigner } from '~/lib/providers/Wallet.provider';
import { WasmdProvider } from '~/lib/providers/Wasmd.provider';
import type { ChainConfig } from '~/lib/registry/chains';
import { findChainRegistry } from '~/lib/registry/chains';

const Mint = () => {
  const { isConnected, chain } = useAccount();
  const signerContext = useEvmSigner();
  const toast = useToast();

  const form = useFormik({
    initialValues: {
      nativeContractAddress: '',
      recipient: '',
      tokenId: '0',
      mint: false,
    },
    onSubmit: async (values) => {
      toast({
        position: 'top-right',
        title: 'Sending transaction',
        description: 'Please confirm your transaction',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
      try {
        const wasmdProvider = new WasmdProvider(
          signerContext?.signer as JsonRpcSigner,
          findChainRegistry(chain?.id || 0) as ChainConfig
        );

        const instruction = values.mint
          ? WasmdProvider.getMintInstruction(
              values.nativeContractAddress,
              values.recipient,
              values.tokenId
            )
          : WasmdProvider.getTransferInstruction(
              values.nativeContractAddress,
              values.recipient,
              values.tokenId
            );

        await wasmdProvider.handleWasmd(instruction);

        toast({
          position: 'top-right',
          title: 'Transaction success',
          description: 'Transaction success',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (er) {
        toast({
          position: 'top-right',
          title: 'Transaction failed',
          description: 'Transaction failed',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const getNativeSeiAddress = useCallback(async () => {
    const mintProvider = new WasmdProvider(
      signerContext?.signer as JsonRpcSigner,
      findChainRegistry(chain?.id || 0) as ChainConfig
    );
    const addr = await mintProvider.getSeiAddress();
    await form.setFieldValue('recipient', addr);
  }, [form, signerContext?.signer, chain?.id]);

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
      <Text as="h1" fontSize={24} fontWeight="bold">
        Input the information below
      </Text>

      <FormControl
        isInvalid={
          !!form.errors.nativeContractAddress &&
          form.touched.nativeContractAddress
        }
      >
        <FormLabel>
          Contract Address (as Bech32 formatted, start with sei)
        </FormLabel>
        <Input
          {...form.getFieldProps('nativeContractAddress')}
          disabled={form.isSubmitting}
        />
        <FormErrorMessage>{form.errors.nativeContractAddress}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!form.errors.tokenId && form.touched.tokenId}>
        <FormLabel>Token Id</FormLabel>
        <Input
          {...form.getFieldProps('tokenId')}
          disabled={form.isSubmitting}
        />
        <FormErrorMessage>{form.errors.tokenId}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!form.errors.recipient && form.touched.recipient}
      >
        <FormLabel>
          Recipient
          <Button
            isDisabled={form.isSubmitting}
            onClick={getNativeSeiAddress}
            ml={4}
          >
            Fetch your native sei address
          </Button>
        </FormLabel>
        <Input
          {...form.getFieldProps('recipient')}
          disabled={form.isSubmitting}
        />
        <FormErrorMessage>{form.errors.recipient}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>
          <Text as="span">Toggle Mint/Transfer</Text>
          <Button
            ml={4}
            isDisabled={form.isSubmitting}
            colorScheme="purple"
            onClick={() => form.setFieldValue('mint', !form.values.mint)}
          >
            {form.values.mint ? 'Mint' : 'Transfer'}
          </Button>
          <br />
          <br />
          <br />
          <br />
          <Text>
            You will{' '}
            <Text as="span" fontWeight="bold">
              {form.values.mint ? 'mint' : 'transfer'}
            </Text>{' '}
            the nft{' '}
            <Text as="span" fontWeight="bold">
              {form.values.tokenId}
            </Text>{' '}
            to{' '}
            <Text as="span" fontWeight="bold">
              {form.values.recipient}
            </Text>
          </Text>
        </FormLabel>
      </FormControl>

      <FormControl>
        <Button
          isDisabled={
            !form.values.nativeContractAddress ||
            !form.values.recipient ||
            !form.values.tokenId
          }
          mt={4}
          mr={4}
          colorScheme="teal"
          isLoading={form.isSubmitting}
          onClick={form.submitForm}
          type="submit"
        >
          Submit
        </Button>

        <Button
          isDisabled={form.isSubmitting}
          mt={4}
          colorScheme="gray"
          onClick={() =>
            form.resetForm({
              values: {
                nativeContractAddress: '',
                recipient: '',
                tokenId: '0',
                mint: false,
              },
            })
          }
        >
          Clear form
        </Button>
      </FormControl>
    </Flex>
  );
};

export default Mint;
