import EVMWatchBase from './evm.watch'
export default class OptimismWatch extends EVMWatchBase {
    readonly minConfirmations: number = 3
}
