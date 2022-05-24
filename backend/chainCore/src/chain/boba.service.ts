import { EvmExplorerService } from "./evm-explorer.service";

/**
 * https://blockexplorer.boba.network/
 */
export class Boba extends EvmExplorerService {
  readonly minConfirmations: number = 1
}
