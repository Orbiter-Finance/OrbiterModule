import { EvmExplorerService } from "./evm-explorer.service";

export class Polygon extends EvmExplorerService {
  readonly minConfirmations: number = 3
}
