/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from './common';

export declare namespace IWasmd {
  export type ExecuteMsgStruct = {
    contractAddress: string;
    msg: BytesLike;
    coins: BytesLike;
  };

  export type ExecuteMsgStructOutput = [
    contractAddress: string,
    msg: string,
    coins: string,
  ] & { contractAddress: string; msg: string; coins: string };
}

export interface WasmdInterface extends Interface {
  getFunction(
    nameOrSignature: 'execute' | 'execute_batch' | 'instantiate' | 'query'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'execute',
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'execute_batch',
    values: [IWasmd.ExecuteMsgStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'instantiate',
    values: [BigNumberish, string, BytesLike, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'query',
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: 'execute', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'execute_batch',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'instantiate',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'query', data: BytesLike): Result;
}

export interface Wasmd extends BaseContract {
  connect(runner?: ContractRunner | null): Wasmd;
  waitForDeployment(): Promise<this>;

  interface: WasmdInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  execute: TypedContractMethod<
    [contractAddress: string, msg: BytesLike, coins: BytesLike],
    [string],
    'payable'
  >;

  execute_batch: TypedContractMethod<
    [executeMsgs: IWasmd.ExecuteMsgStruct[]],
    [string[]],
    'payable'
  >;

  instantiate: TypedContractMethod<
    [
      codeID: BigNumberish,
      admin: string,
      msg: BytesLike,
      label: string,
      coins: BytesLike,
    ],
    [[string, string] & { contractAddr: string; data: string }],
    'payable'
  >;

  query: TypedContractMethod<
    [contractAddress: string, req: BytesLike],
    [string],
    'view'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: 'execute'
  ): TypedContractMethod<
    [contractAddress: string, msg: BytesLike, coins: BytesLike],
    [string],
    'payable'
  >;
  getFunction(
    nameOrSignature: 'execute_batch'
  ): TypedContractMethod<
    [executeMsgs: IWasmd.ExecuteMsgStruct[]],
    [string[]],
    'payable'
  >;
  getFunction(
    nameOrSignature: 'instantiate'
  ): TypedContractMethod<
    [
      codeID: BigNumberish,
      admin: string,
      msg: BytesLike,
      label: string,
      coins: BytesLike,
    ],
    [[string, string] & { contractAddr: string; data: string }],
    'payable'
  >;
  getFunction(
    nameOrSignature: 'query'
  ): TypedContractMethod<
    [contractAddress: string, req: BytesLike],
    [string],
    'view'
  >;

  filters: {};
}
