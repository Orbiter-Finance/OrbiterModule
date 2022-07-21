import { EvmExplorerService } from "./evm-explorer.service";
import {
    IChainConfig,
  } from '../types/chain'
import Web3 from "web3";

export class BSC extends EvmExplorerService {
    constructor(public readonly chainConfig: IChainConfig) {
        super(chainConfig);
        this.web3 = new Web3(this.chainConfig.rpc[0]);
    }
}
