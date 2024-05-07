import { JsonRpcSigner } from 'ethers';
import { hashMessage, recoverPublicKey, toHex } from 'viem';
import { fromHex, toBech32 } from '@cosmjs/encoding';
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino';
import { Secp256k1 } from '@cosmjs/crypto';
import { getCosmWasmClient } from '@sei-js/core';

import { Wasmd__factory } from '~/lib/providers/wasmd/contracts';
import { ChainConfig } from '~/lib/registry/chains';


export class MintProvider {
  constructor(
    private readonly wallet: JsonRpcSigner,
    private chainConfig: ChainConfig,
  ) {}

  public getMintInstruction(contractAddress: string, ownerAddress: string, tokenId: string) {
    return {
      contractAddress,
      msg: {
        mint: {
          owner: ownerAddress,
          token_id: tokenId,
        },
      },
    };

  };

  public async handleEvmMint(contractAddress: string, tokenId: string): Promise<{
    tokens: string[],
    txHash: string
  } | null> {
    const { wallet } = this;

    const message = 'Sign this message to get your SEI address';
    const signature = await wallet.signMessage(message);
    const pubKey = await recoverPublicKey({
      hash: hashMessage(message),
      signature: signature as `0x${string}`,
    });
    const compressedPubKey = Secp256k1.compressPubkey(
      fromHex(pubKey.substring(2)),
    );
    const seiAddress = toBech32(
      'sei',
      rawSecp256k1PubkeyToRawAddress(compressedPubKey),
    );
    console.log(seiAddress);
    const instruction = this.getMintInstruction(contractAddress, seiAddress, tokenId);
    console.log({instruction});
    const wasmd = Wasmd__factory.connect(this.chainConfig.contractAddresses.Wasmd, this.wallet);
    const tx = await wasmd.execute(
      instruction.contractAddress,
      toHex(JSON.stringify(instruction.msg)),
      toHex(JSON.stringify([])),
    );
    await tx.wait(5);
    console.log(tx.hash);

    // We don't get logs from the EVM tx, so will have to get minted tokens from the contract itself
    const client = await getCosmWasmClient(this.chainConfig.nativeRpcUrl);
    const { tokens } = await client.queryContractSmart(
      contractAddress,
      { tokens: { owner: seiAddress } },
    );

    return {
      tokens,
      txHash: tx.hash,
    };
  };
}