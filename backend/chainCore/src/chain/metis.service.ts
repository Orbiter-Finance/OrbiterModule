import { EvmExplorerService } from "./evm-explorer.service";
export class Metis extends EvmExplorerService {
  readonly minConfirmations: number = 3
}
