import EVMWatchBase from './evm.watch'
export default class BSCWatch extends EVMWatchBase {
    readonly minConfirmations: number = 3
}
