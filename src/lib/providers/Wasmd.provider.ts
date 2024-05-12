import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino';
import { Secp256k1 } from '@cosmjs/crypto';
import { fromHex, toBech32 } from '@cosmjs/encoding';
import type { JsonRpcSigner } from 'ethers';
import { hashMessage, recoverPublicKey, toHex } from 'viem';

import { Wasmd__factory } from '~/lib/providers/wasmd/contracts';
import type { ChainConfig } from '~/lib/registry/chains';
//
// if (window as any) {
//   (window as any).Secp256k1 = Secp256k1;
//   (window as any).rawSecp256k1PubkeyToRawAddress = rawSecp256k1PubkeyToRawAddress;
//   (window as any).fromBase64 = fromBase64;
//   (window as any).Secp256k1Signature = Secp256k1Signature;
//   (window as any).toBech32 = toBech32;
// }

export class WasmdProvider {
  constructor(
    private readonly wallet: JsonRpcSigner,
    private chainConfig: ChainConfig
  ) {}

  public static getMintInstruction(
    contractAddress: string,
    ownerAddress: string,
    tokenId: string
  ) {
    return {
      contractAddress,
      msg: {
        mint: {
          owner: ownerAddress,
          token_id: tokenId,
        },
      },
    };
  }

  public static getTransferInstruction(
    contractAddress: string,
    recipient: string,
    tokenId: string
  ) {
    return {
      contractAddress,
      msg: {
        transfer_nft: {
          recipient,
          token_id: tokenId,
        },
      },
    };
  }

  public async getSeiAddress() {
    const { wallet } = this;

    const message = 'Sign this message to get your SEI address';
    const signature = await wallet.signMessage(message);
    const pubKey = await recoverPublicKey({
      hash: hashMessage(message),
      signature: signature as `0x${string}`,
    });

    const compressedPubKey = Secp256k1.compressPubkey(
      fromHex(pubKey.substring(2))
    );
    return toBech32('sei', rawSecp256k1PubkeyToRawAddress(compressedPubKey));
  }

  public async handleWasmd(instruction: {
    contractAddress: string;
    msg: Record<string, string>;
  }): Promise<{
    txHash: string;
  } | null> {
    const wasmd = Wasmd__factory.connect(
      this.chainConfig.contractAddresses.Wasmd,
      this.wallet
    );
    const tx = await wasmd.execute(
      instruction.contractAddress,
      toHex(JSON.stringify(instruction.msg)),
      toHex(JSON.stringify([]))
    );
    await tx.wait(5);

    return {
      txHash: tx.hash,
    };
  }
}
