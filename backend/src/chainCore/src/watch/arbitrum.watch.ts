import EVMWatchBase from './evm.watch'
export default class ArbitrumWatch extends EVMWatchBase {
   readonly minConfirmations: number = 3
}
