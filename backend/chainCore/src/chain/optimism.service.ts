import { EvmExplorerService } from "./evm-explorer.service";

export class Optimism extends EvmExplorerService {
  readonly minConfirmations: number = 3
}
