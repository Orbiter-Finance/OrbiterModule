import EVMWatchBase from './evm.watch'
export default class EthereumWatch extends EVMWatchBase {
    readonly minConfirmations: number = 3
}
