import { EvmExplorerService } from "./evm-explorer.service";
export class Ethereum extends EvmExplorerService {
  readonly minConfirmations: number = 3
}
