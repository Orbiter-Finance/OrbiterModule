import chains from '../chain'
import { getChainByInternalId } from '../utils/chains'
import BasetWatch from './base.watch'
import ArbitrumWatch from './arbitrum.watch';
import BobaWatch from './boba.watch'
import ZKSyncWatch from './zksync.watch'
import ZKSpaceWatch from './zkspace.watch'
import DydxWatch from './dydx.watch'
import MetisWatch from './metis.watch'
import PolygonWatch from './polygon.watch'
import OptimismWatch from './optimism.watch'
import EthereumWatch from './ethereum.watch'
import { IChainConfig } from '../types';
export class ChainFactory {
  static createWatchChainByIntranetId(intranetChainId: IChainConfig['internalId']): BasetWatch {
    let watchChain: BasetWatch | null;
    const chainConfig = getChainByInternalId(intranetChainId)
    if (!chainConfig) {
      throw new Error(`Internal public Chain ID profile not found ${intranetChainId}`);
    }
    switch (intranetChainId) {
      case '1':
        watchChain = new EthereumWatch(new chains.EthereumChain(chainConfig))
        break
      case '2':
        watchChain = new ArbitrumWatch(new chains.ArbitrumChain(chainConfig))
        break
      case '3':
        watchChain = new ZKSyncWatch(new chains.ZKSpaceChain(chainConfig))
        break
      case '6':
        watchChain = new PolygonWatch(new chains.PolygonChain(chainConfig))
        break
      case '7':
        watchChain = new OptimismWatch(new chains.OptimismChain(chainConfig))
        break
      case '10':
        watchChain = new MetisWatch(new chains.MetisChain(chainConfig))
        break
      case '11':
        watchChain = new DydxWatch(new chains.DydxChain(chainConfig))
        break
      case '12':
        watchChain = new ZKSpaceWatch(new chains.ZKSpaceChain(chainConfig))
        break
      case '13':
        watchChain = new BobaWatch(new chains.BobaChain(chainConfig))
        break
      default:
        throw new Error(`Public chain id not found ${intranetChainId}`)
    }
    return watchChain
  }
}
